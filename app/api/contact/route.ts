import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Destructure all fields
    const { 
      name, 
      email, 
      company_size, 
      agent_count, 
      data_types, 
      challenge 
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('contacts')
      .insert([{ 
        name, 
        email, 
        company_size,
        agent_count,
        data_types,
        challenge
      }])

    if (error) {
      console.error('Supabase Error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}