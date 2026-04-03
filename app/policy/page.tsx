"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Shield,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Sliders,
  Fingerprint,
  Hash,
  Lock,
  Route,
  AlertOctagon,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

// ============================================================
// Types
// ============================================================

interface Policy {
  settings?: {
    confidence_threshold?: number
    default_action?: string
  }
  pii?: {
    enabled?: boolean
    enabled_entities?: string[]
    action_mode?: string
    placeholder_format?: { mode?: string }
  }
  custom_patterns?: {
    name: string
    regex: string
    score: number
    context?: string[]
  }[]
  agent_security?: {
    blocked_domains?: string[]
    blocked_prompt_patterns?: string[]
    blocked_tool_patterns?: string[]
    force_redact_url_patterns?: string[]
  }
  routing?: {
    default_model?: string
    intent_mapping?: Record<string, { keywords?: string[]; model?: string }>
  }
}

// ============================================================
// Default entity lists for the editor
// ============================================================

const ALL_PII_ENTITIES = [
  { name: "PERSON", label: "Person Names", category: "personal" },
  { name: "EMAIL_ADDRESS", label: "Email Addresses", category: "personal" },
  { name: "PHONE_NUMBER", label: "Phone Numbers", category: "personal" },
  { name: "LOCATION", label: "Physical Locations", category: "personal" },
  { name: "DATE_TIME", label: "Dates & Times", category: "personal" },
  { name: "CREDIT_CARD", label: "Credit Card Numbers", category: "financial" },
  { name: "IBAN_CODE", label: "IBAN Codes", category: "financial" },
  { name: "US_BANK_NUMBER", label: "US Bank Accounts", category: "financial" },
  { name: "CRYPTO", label: "Crypto Wallets", category: "financial" },
  { name: "US_SSN", label: "US Social Security", category: "government" },
  { name: "US_PASSPORT", label: "US Passports", category: "government" },
  { name: "US_DRIVER_LICENSE", label: "Driver Licenses", category: "government" },
  { name: "US_ITIN", label: "US Tax IDs", category: "government" },
  { name: "UK_NINO", label: "UK National Insurance", category: "government" },
  { name: "SG_NRIC_FIN", label: "Singapore NRIC", category: "government" },
  { name: "MEDICAL_LICENSE", label: "Medical Licenses", category: "healthcare" },
  { name: "IP_ADDRESS", label: "IP Addresses", category: "technical" },
  { name: "URL", label: "URLs", category: "technical" },
  { name: "DOMAIN_NAME", label: "Domain Names", category: "technical" },
]

const ACTION_MODES = ["redact", "mask", "fake", "block", "warn"] as const

// ============================================================
// Collapsible Section Component
// ============================================================

function Section({
  title,
  icon,
  desc,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ReactNode
  desc: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center text-electric">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-platinum">{title}</h3>
            <p className="text-platinum/40 text-[11px]">{desc}</p>
          </div>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-platinum/30" />
        ) : (
          <ChevronRight className="w-4 h-4 text-platinum/30" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4">{children}</div>
      )}
    </div>
  )
}

// ============================================================
// Main Policy Editor Page
// ============================================================

export default function PolicyEditorPage() {
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [originalPolicy, setOriginalPolicy] = useState<Policy | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // New custom pattern form
  const [newPattern, setNewPattern] = useState({ name: "", regex: "", score: 0.8 })

  // ============================================================
  // Data fetching
  // ============================================================

  async function fetchPolicy() {
    setLoading(true)
    try {
      const res = await fetch("/api/policy", { cache: "no-store" })
      const data = await res.json()
      if (data.policy) {
        const deep = JSON.parse(JSON.stringify(data.policy))
        setPolicy(deep)
        setOriginalPolicy(deep)
      }
    } catch (e) {
      console.error("Failed to fetch policy:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPolicy()
  }, [])

  // ============================================================
  // Helpers
  // ============================================================

  function hasChanges() {
    return JSON.stringify(policy) !== JSON.stringify(originalPolicy)
  }

  function updatePolicy(updates: Partial<Policy>) {
    setPolicy((prev) => (prev ? { ...prev, ...updates } : prev))
  }

  function updateSettings(updates: Partial<NonNullable<Policy>["settings"]>) {
    setPolicy((prev) => ({
      ...prev,
      settings: { ...(prev?.settings || {}), ...updates },
    }))
  }

  function toggleEntity(entityName: string) {
    setPolicy((prev) => {
      if (!prev) return prev
      const current = prev.pii?.enabled_entities || ALL_PII_ENTITIES.map((e) => e.name)
      const updated = current.includes(entityName)
        ? current.filter((e) => e !== entityName)
        : [...current, entityName]
      return { ...prev, pii: { ...(prev.pii || {}), enabled_entities: updated } }
    })
  }

  function addToList(path: string, value: string) {
    setPolicy((prev) => {
      if (!prev) return prev
      const result = JSON.parse(JSON.stringify(prev))
      const keys = path.split(".")
      let obj = result as any
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = []
        obj = obj[keys[i]]
      }
      const lastKey = keys[keys.length - 1]
      if (!Array.isArray(obj[lastKey])) obj[lastKey] = []
      if (value.trim() && !obj[lastKey].includes(value.trim())) {
        obj[lastKey].push(value.trim())
      }
      return result
    })
  }

  function removeFromList(path: string, index: number) {
    setPolicy((prev) => {
      if (!prev) return prev
      const result = JSON.parse(JSON.stringify(prev))
      const keys = path.split(".")
      let obj = result as any
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      const lastKey = keys[keys.length - 1]
      if (Array.isArray(obj[lastKey])) {
        obj[lastKey].splice(index, 1)
      }
      return result
    })
  }

  function addCustomPattern() {
    if (!newPattern.name.trim() || !newPattern.regex.trim()) return
    setPolicy((prev) => ({
      ...prev,
      custom_patterns: [...(prev?.custom_patterns || []), { ...newPattern }],
    }))
    setNewPattern({ name: "", regex: "", score: 0.8 })
  }

  function removeCustomPattern(index: number) {
    setPolicy((prev) => ({
      ...prev,
      custom_patterns: (prev?.custom_patterns || []).filter((_, i) => i !== index),
    }))
  }

  // ============================================================
  // Save / Reset
  // ============================================================

  async function handleSave() {
    if (!policy) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/policy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy }),
      })
      const data = await res.json()
      if (data.error) {
        setMessage({ type: "error", text: data.error })
      } else {
        setMessage({ type: "success", text: "Policy saved successfully!" })
        const deep = JSON.parse(JSON.stringify(policy))
        setOriginalPolicy(deep)
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save policy" })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 4000)
    }
  }

  async function handleReset() {
    if (!confirm("Reset all policy settings to defaults? Your customizations will be lost.")) return
    setResetting(true)
    setMessage(null)
    try {
      const res = await fetch("/api/policy", { method: "DELETE" })
      const data = await res.json()
      if (data.error) {
        setMessage({ type: "error", text: data.error })
      } else {
        setMessage({ type: "success", text: "Policy reset to defaults." })
        await fetchPolicy()
      }
    } catch {
      setMessage({ type: "error", text: "Failed to reset policy" })
    } finally {
      setResetting(false)
      setTimeout(() => setMessage(null), 4000)
    }
  }

  // ============================================================
  // String list editor sub-component
  // ============================================================

  function StringListEditor({
    title,
    path,
    items,
    placeholder,
  }: {
    title: string
    path: string
    items: string[]
    placeholder: string
  }) {
    const [input, setInput] = useState("")

    return (
      <div className="mb-4">
        <label className="text-platinum/50 text-[11px] uppercase tracking-wider block mb-2">{title}</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addToList(path, input)
                setInput("")
              }
            }}
            placeholder={placeholder}
            className="flex-1 bg-smoke/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-platinum placeholder:text-platinum/25 focus:outline-none focus:border-electric/50"
          />
          <button
            onClick={() => {
              addToList(path, input)
              setInput("")
            }}
            className="px-3 py-2 rounded-lg bg-electric/10 border border-electric/20 text-electric text-xs hover:bg-electric/20 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-obsidian border border-white/5 text-[11px] text-platinum/60"
            >
              <code>{item}</code>
              <button
                onClick={() => removeFromList(path, i)}
                className="text-red-400/40 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {items.length === 0 && (
            <span className="text-platinum/20 text-[11px]">No items added</span>
          )}
        </div>
      </div>
    )
  }

  // ============================================================
  // Render
  // ============================================================

  return (
    <main className="min-h-screen grid-bg pt-24 px-4 sm:px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* ---- Header ---- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
              <Sliders className="w-8 h-8 text-electric" />
              Policy Editor
            </h1>
            <p className="text-platinum/50 text-sm mt-1">
              Customize your security rules without touching YAML.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={fetchPolicy}>
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={resetting || !hasChanges()}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${resetting ? "animate-spin" : ""}`} />
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={saving || !hasChanges()}
            >
              <Save className={`w-3.5 h-3.5 ${saving ? "animate-spin" : ""}`} />
              {saving ? "Saving..." : hasChanges() ? "Save Changes" : "Saved"}
            </Button>
          </div>
        </div>

        {/* ---- Unsaved changes banner ---- */}
        {hasChanges() && (
          <div className="mb-6 px-4 py-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="text-yellow-400/70 text-xs">You have unsaved changes. Click &quot;Save Changes&quot; to apply.</span>
          </div>
        )}

        {/* ---- Message toast ---- */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg border flex items-center gap-2 ${
              message.type === "success"
                ? "bg-green-500/5 border-green-500/10 text-green-400"
                : "bg-red-500/5 border-red-500/10 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-electric/50 animate-spin" />
          </div>
        ) : policy ? (
          <div className="space-y-4">
            {/* ============================================================ */}
            {/* 1. Global Settings */}
            {/* ============================================================ */}
            <Section
              title="Global Settings"
              icon={<Sliders className="w-4 h-4" />}
              desc="Confidence threshold and default action mode"
              defaultOpen={true}
            >
              {/* Confidence Threshold */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-platinum/50 text-[11px] uppercase tracking-wider">
                    Confidence Threshold
                  </label>
                  <span className="text-electric text-sm font-mono font-bold">
                    {policy.settings?.confidence_threshold ?? 0.6}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={policy.settings?.confidence_threshold ?? 0.6}
                  onChange={(e) =>
                    updateSettings({ confidence_threshold: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-electric"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-platinum/20 text-[9px]">Aggressive (0.0)</span>
                  <span className="text-platinum/20 text-[9px]">Conservative (1.0)</span>
                </div>
                <p className="text-platinum/30 text-[10px] mt-2">
                  Lower values catch more potential PII but may produce false positives. Higher values only trigger on high-confidence matches.
                </p>
              </div>

              {/* Default Action */}
              <div>
                <label className="text-platinum/50 text-[11px] uppercase tracking-wider block mb-2">
                  Default Action Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {ACTION_MODES.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateSettings({ default_action: mode })}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        (policy.settings?.default_action || "redact") === mode
                          ? "bg-electric/15 border-electric/30 text-electric"
                          : "bg-obsidian border-white/5 text-platinum/50 hover:border-white/10"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="mt-2 px-3 py-2 rounded-lg bg-obsidian border border-white/5">
                  <p className="text-platinum/40 text-[10px]">
                    {policy.settings?.default_action === "redact" && "Replace PII with placeholders like <EMAIL_ADDRESS_abc123>"}
                    {policy.settings?.default_action === "mask" && "Partially hide PII: ****@gmail.com"}
                    {policy.settings?.default_action === "fake" && "Replace with realistic fake data using Faker library"}
                    {policy.settings?.default_action === "block" && "Block the entire request if any PII is detected"}
                    {policy.settings?.default_action === "warn" && "Log a warning but allow the request through"}
                  </p>
                </div>
              </div>
            </Section>

            {/* ============================================================ */}
            {/* 2. PII Detection */}
            {/* ============================================================ */}
            <Section
              title="PII Detection"
              icon={<Fingerprint className="w-4 h-4" />}
              desc="Toggle which entity types to detect and redact"
              defaultOpen={true}
            >
              {(["personal", "financial", "government", "healthcare", "technical"] as const).map((cat) => (
                <div key={cat} className="mb-4">
                  <h4 className="text-platinum/50 text-[10px] uppercase tracking-wider mb-2">
                    {cat === "personal" && "Personal Identifiers"}
                    {cat === "financial" && "Financial & Banking"}
                    {cat === "government" && "Government & Legal IDs"}
                    {cat === "healthcare" && "Healthcare (HIPAA)"}
                    {cat === "technical" && "Tech & Network"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {ALL_PII_ENTITIES.filter((e) => e.category === cat).map((entity) => {
                      const isEnabled =
                        policy?.pii?.enabled_entities == null ||
                        policy.pii.enabled_entities.includes(entity.name)
                      return (
                        <button
                          key={entity.name}
                          onClick={() => toggleEntity(entity.name)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs transition-all cursor-pointer ${
                            isEnabled
                              ? "bg-electric/10 border-electric/20 text-platinum/80"
                              : "bg-obsidian border-white/5 text-platinum/25"
                          }`}
                        >
                          {isEnabled ? (
                            <Eye className="w-3.5 h-3.5 text-electric shrink-0" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-platinum/20 shrink-0" />
                          )}
                          {entity.label}
                          <span className="ml-auto text-platinum/20 text-[9px] font-mono">
                            {entity.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </Section>

            {/* ============================================================ */}
            {/* 3. Custom Patterns */}
            {/* ============================================================ */}
            <Section
              title="Custom Patterns"
              icon={<Hash className="w-4 h-4" />}
              desc="Add regex patterns for company-specific identifiers"
            >
              <div className="mb-4">
                <label className="text-platinum/50 text-[11px] uppercase tracking-wider block mb-3">
                  Add Custom Pattern
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_80px_auto] gap-2 mb-2">
                  <input
                    type="text"
                    value={newPattern.name}
                    onChange={(e) => setNewPattern((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Pattern name"
                    className="bg-smoke/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-platinum placeholder:text-platinum/25 focus:outline-none focus:border-electric/50"
                  />
                  <input
                    type="text"
                    value={newPattern.regex}
                    onChange={(e) => setNewPattern((p) => ({ ...p, regex: e.target.value }))}
                    placeholder="Regex pattern (e.g., EMP-\\d{6})"
                    className="bg-smoke/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-platinum placeholder:text-platinum/25 focus:outline-none focus:border-electric/50 font-mono"
                  />
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={newPattern.score}
                    onChange={(e) =>
                      setNewPattern((p) => ({ ...p, score: parseFloat(e.target.value) }))
                    }
                    className="bg-smoke/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-platinum placeholder:text-platinum/25 focus:outline-none focus:border-electric/50"
                  />
                  <button
                    onClick={addCustomPattern}
                    disabled={!newPattern.name.trim() || !newPattern.regex.trim()}
                    className="px-3 py-2 rounded-lg bg-electric/10 border border-electric/20 text-electric text-xs hover:bg-electric/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-platinum/25 text-[9px]">
                  Score: confidence level (0.0 - 1.0) for this regex match.
                </p>
              </div>

              {/* Existing custom patterns */}
              <div className="space-y-2">
                {(policy.custom_patterns || []).map((pattern, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-obsidian border border-white/5"
                  >
                    <div>
                      <p className="text-xs font-medium text-platinum/70">{pattern.name}</p>
                      <code className="text-[10px] text-platinum/30 font-mono">{pattern.regex}</code>
                      <span className="text-[9px] text-platinum/20 ml-2">
                        score: {pattern.score}
                      </span>
                    </div>
                    <button
                      onClick={() => removeCustomPattern(i)}
                      className="p-1.5 rounded-md text-red-400/40 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {(policy.custom_patterns || []).length === 0 && (
                  <p className="text-platinum/20 text-xs text-center py-4">
                    No custom patterns. Add one above.
                  </p>
                )}
              </div>
            </Section>

            {/* ============================================================ */}
            {/* 4. Agent Security */}
            {/* ============================================================ */}
            <Section
              title="Agent Security"
              icon={<Lock className="w-4 h-4" />}
              desc="Data exfiltration prevention and prompt injection defense"
            >
              <StringListEditor
                title="Blocked Domains"
                path="agent_security.blocked_domains"
                items={policy.agent_security?.blocked_domains || []}
                placeholder="e.g., competitor.com"
              />
              <StringListEditor
                title="Blocked Prompt Patterns"
                path="agent_security.blocked_prompt_patterns"
                items={policy.agent_security?.blocked_prompt_patterns || []}
                placeholder="e.g., ignore previous instructions"
              />
              <StringListEditor
                title="Blocked Tool Patterns"
                path="agent_security.blocked_tool_patterns"
                items={policy.agent_security?.blocked_tool_patterns || []}
                placeholder="e.g., DROP TABLE"
              />
              <StringListEditor
                title="Force Redact URL Patterns"
                path="agent_security.force_redact_url_patterns"
                items={policy.agent_security?.force_redact_url_patterns || []}
                placeholder="e.g., *.internal.company.com"
              />
            </Section>

            {/* ============================================================ */}
            {/* 5. Model Routing */}
            {/* ============================================================ */}
            <Section
              title="Model Routing"
              icon={<Route className="w-4 h-4" />}
              desc="Configure how requests are routed to different models"
            >
              {/* Default model */}
              <div className="mb-5">
                <label className="text-platinum/50 text-[11px] uppercase tracking-wider block mb-2">
                  Default Fallback Model
                </label>
                <input
                  type="text"
                  value={policy.routing?.default_model || ""}
                  onChange={(e) =>
                    updatePolicy({
                      routing: {
                        ...(policy?.routing || {}),
                        default_model: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., meta-llama/llama-3.3-70b-instruct:free"
                  className="w-full bg-smoke/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-platinum placeholder:text-platinum/25 focus:outline-none focus:border-electric/50 font-mono"
                />
              </div>

              {/* Intent mappings */}
              <div>
                <label className="text-platinum/50 text-[11px] uppercase tracking-wider block mb-3">
                  Intent Mappings
                </label>
                {(policy.routing?.intent_mapping &&
                  Object.entries(policy.routing.intent_mapping).length > 0) ? (
                  <div className="space-y-3">
                    {Object.entries(policy.routing.intent_mapping).map(([intent, config]) => (
                      <div
                        key={intent}
                        className="p-3 rounded-lg bg-obsidian border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-platinum/60 capitalize">{intent}</span>
                          <button
                            onClick={() => {
                              const updated = { ...(policy?.routing || {}) }
                              if (updated.intent_mapping) {
                                delete updated.intent_mapping[intent]
                                updatePolicy({ routing: updated })
                              }
                            }}
                            className="text-red-400/40 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-platinum/30 text-[9px] block mb-1">Keywords</span>
                            <p className="text-[10px] text-platinum/50 font-mono">
                              {(config.keywords || []).join(", ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-platinum/30 text-[9px] block mb-1">Model</span>
                            <p className="text-[10px] text-platinum/50 font-mono">{config.model || "—"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-platinum/20 text-xs text-center py-3">
                    Using default routing from policy.yaml
                  </p>
                )}
                <p className="text-platinum/20 text-[9px] mt-3">
                  Tip: Edit model routing directly in your policy.yaml file for full control over intent keywords.
                </p>
              </div>
            </Section>

            {/* ---- Quick Links ---- */}
            <div className="glass-card p-5 rounded-xl border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/settings" className="p-4 rounded-lg bg-obsidian border border-white/5 hover:border-electric/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-platinum/40 group-hover:text-electric transition-colors" />
                    <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum transition-colors">Settings</span>
                  </div>
                  <p className="text-platinum/30 text-[10px]">API keys &amp; subscription</p>
                </Link>
                <Link href="/dashboard" className="p-4 rounded-lg bg-obsidian border border-white/5 hover:border-electric/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertOctagon className="w-4 h-4 text-platinum/40 group-hover:text-electric transition-colors" />
                    <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum transition-colors">Compliance Ledger</span>
                  </div>
                  <p className="text-platinum/30 text-[10px]">Audit logs &amp; security events</p>
                </Link>
                <Link href="/pricing" className="p-4 rounded-lg bg-obsidian border border-white/5 hover:border-electric/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-platinum/40 group-hover:text-electric transition-colors" />
                    <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum transition-colors">Pricing</span>
                  </div>
                  <p className="text-platinum/30 text-[10px]">Upgrade for more control</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-platinum/40 text-sm text-center py-20">
            Failed to load policy.
          </div>
        )}

        {/* ---- Footer ---- */}
        <div className="mt-8 text-center">
          <p className="text-platinum/20 text-xs">
            Policy changes take effect immediately for new requests.
          </p>
        </div>
      </div>
    </main>
  )
}