"use client"

import { useEffect, useState } from "react"
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Clock,
  Filter,
  Search,
  ChevronDown,
  AlertTriangle,
  Eye,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/Button"

// ============================================================
// Types
// ============================================================

interface AuditLog {
  id: number | null
  timestamp: string
  event: string
  risk_detected: boolean
  entities_blocked: string[]
  sanitized_snippet: string
}

interface AuditStats {
  total_events: number
  blocked: number
  sanitized: number
  top_entities: [string, number][]
  events_over_time: { hour: string; count: number }[]
}

// ============================================================
// Chart Components (Pure CSS — no extra dependencies)
// ============================================================

function BarChart({ data, maxValue }: { data: { label: string; value: number; color: string }[]; maxValue?: number }) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-1.5 h-32 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-[10px] text-platinum/50">{d.value}</span>
          <div
            className="w-full rounded-t transition-all duration-500 ease-out min-h-[2px]"
            style={{
              height: `${(d.value / max) * 100}%`,
              backgroundColor: d.color,
              opacity: 0.85,
            }}
          />
          <span className="text-[9px] text-platinum/40 truncate max-w-full text-center leading-tight">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function TimelineChart({ data }: { data: { hour: string; count: number }[] }) {
  if (!data.length) return <div className="text-platinum/30 text-sm text-center py-8">No data</div>
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="flex items-end gap-0.5 h-40 w-full overflow-x-auto">
      {data.map((d, i) => {
        const timeLabel = d.hour.split("T")[1]?.substring(0, 5) || d.hour
        return (
          <div key={i} className="flex flex-col items-center flex-1 min-w-[24px] gap-1">
            <span className="text-[9px] text-platinum/50">{d.count}</span>
            <div className="w-full flex items-end" style={{ height: "100%" }}>
              <div
                className="w-full rounded-t bg-electric/70 transition-all duration-700 ease-out"
                style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? "3px" : "0px" }}
              />
            </div>
            <span className="text-[8px] text-platinum/30 whitespace-nowrap">{timeLabel}</span>
          </div>
        )
      })}
    </div>
  )
}

// ============================================================
// Dashboard Page
// ============================================================

export default function SecureLedgerDashboard() {
  // State
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [stats, setStats] = useState<AuditStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [eventFilter, setEventFilter] = useState<string>("all")
  const [riskOnly, setRiskOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hoursRange, setHoursRange] = useState(720)

  // Pagination
  const [page, setPage] = useState(0)
  const pageSize = 20

  // ============================================================
  // Data Fetching
  // ============================================================

  const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL || "http://localhost:8000"

  async function fetchStats() {
    setStatsLoading(true)
    try {
      const res = await fetch(`${proxyUrl}/api/audit-stats?hours=${hoursRange}`, { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch stats")
      const data = await res.json()
      setStats(data)
    } catch (e: any) {
      console.error("Stats fetch error:", e)
    } finally {
      setStatsLoading(false)
    }
  }

  async function fetchLogs() {
    setLoading(true)
    setError(null)
    try {
      let url = `${proxyUrl}/api/audit-logs?limit=${pageSize}&offset=${page * pageSize}`
      if (eventFilter !== "all") url += `&event_type=${eventFilter}`
      if (riskOnly) url += `&risk_only=true`
      if (hoursRange) url += `&hours=${hoursRange}`

      const res = await fetch(url, { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch logs")
      const data = await res.json()
      setLogs(data.logs || [])
    } catch (e: any) {
      setError(e.message || "Unknown error")
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventFilter, riskOnly, hoursRange, page])

  // ============================================================
  // Derived Data for Charts
  // ============================================================

  const entityBarData = stats?.top_entities
    ? stats.top_entities.map(([name, count]) => ({
        label: name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        value: count,
        color: name.includes("EMAIL")
          ? "#22d3ee"
          : name.includes("PERSON")
          ? "#6366f1"
          : name.includes("URL")
          ? "#fbbf24"
          : "#a78bfa",
      }))
    : []

  // ============================================================
  // Event badge color helper
  // ============================================================

  function getEventBadge(event: string) {
    switch (event) {
      case "request_blocked":
        return "bg-red-500/20 text-red-400 border border-red-500/20"
      case "request_warned":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
      case "prompt_sanitized":
        return "bg-electric/15 text-electric border border-electric/20"
      default:
        return "bg-white/5 text-platinum/60 border border-white/10"
    }
  }

  // ============================================================
  // Filtered logs (client-side search)
  // ============================================================

  const filteredLogs = searchQuery
    ? logs.filter(
        (log) =>
          log.sanitized_snippet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.event?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.entities_blocked?.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : logs

  // ============================================================
  // Render
  // ============================================================

  return (
    <main className="min-h-screen grid-bg pt-24 px-4 sm:px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* ---- Header ---- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
              <Shield className="w-8 h-8 text-electric" />
              Compliance Ledger
            </h1>
            <p className="text-platinum/50 text-sm mt-1">
              Real-time audit trail of all security events. PII is automatically masked.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                fetchStats()
                fetchLogs()
              }}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* ---- Summary Cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Events */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-platinum/50 text-xs uppercase tracking-wider font-medium">Total Events</span>
              <Activity className="w-4 h-4 text-electric" />
            </div>
            <p className="text-3xl font-bold text-platinum">{statsLoading ? "..." : stats?.total_events || 0}</p>
            <p className="text-platinum/30 text-xs mt-1">Last {hoursRange}h</p>
          </div>

          {/* Sanitized */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-platinum/50 text-xs uppercase tracking-wider font-medium">Sanitized</span>
              <ShieldCheck className="w-4 h-4 text-electric" />
            </div>
            <p className="text-3xl font-bold text-electric">{statsLoading ? "..." : stats?.sanitized || 0}</p>
            <p className="text-platinum/30 text-xs mt-1">PII scrubbed &amp; forwarded</p>
          </div>

          {/* Blocked */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-platinum/50 text-xs uppercase tracking-wider font-medium">Blocked</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{statsLoading ? "..." : stats?.blocked || 0}</p>
            <p className="text-platinum/30 text-xs mt-1">Policy violations blocked</p>
          </div>

          {/* Block Rate */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-platinum/50 text-xs uppercase tracking-wider font-medium">Block Rate</span>
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {statsLoading
                ? "..."
                : stats && stats.total_events > 0
                ? `${((stats.blocked / stats.total_events) * 100).toFixed(1)}%`
                : "0%"}
            </p>
            <p className="text-platinum/30 text-xs mt-1">Blocked / Total</p>
          </div>
        </div>

        {/* ---- Charts Row ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Events Over Time */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-platinum mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-electric/70" />
              Events Over Time
              <span className="text-platinum/30 text-xs font-normal">({hoursRange}h window)</span>
            </h3>
            <TimelineChart data={stats?.events_over_time || []} />
          </div>

          {/* Top Entities Detected */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-platinum mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-electric/70" />
              Top Entities Detected
            </h3>
            {entityBarData.length > 0 ? (
              <BarChart data={entityBarData} />
            ) : (
              <div className="text-platinum/30 text-sm text-center py-8">No entity data yet</div>
            )}
          </div>
        </div>

        {/* ---- Filters ---- */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-platinum/50 text-sm">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters:</span>
            </div>

            {/* Event Type Filter */}
            <div className="relative">
              <select
                value={eventFilter}
                onChange={(e) => {
                  setEventFilter(e.target.value)
                  setPage(0)
                }}
                className="appearance-none bg-obsidian border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm text-platinum focus:outline-none focus:border-electric/50 cursor-pointer"
              >
                <option value="all">All Events</option>
                <option value="prompt_sanitized">Sanitized</option>
                <option value="request_blocked">Blocked</option>
                <option value="request_warned">Warned</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-platinum/30 pointer-events-none" />
            </div>

            {/* Time Range */}
            <div className="relative">
              <select
                value={hoursRange}
                onChange={(e) => {
                  setHoursRange(Number(e.target.value))
                  setPage(0)
                }}
                className="appearance-none bg-obsidian border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm text-platinum focus:outline-none focus:border-electric/50 cursor-pointer"
              >
                <option value={1}>Last 1 hour</option>
                <option value={6}>Last 6 hours</option>
                <option value={24}>Last 24 hours</option>
                <option value={72}>Last 3 days</option>
                <option value={168}>Last 7 days</option>
                <option value={720}>Last 30 days</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-platinum/30 pointer-events-none" />
            </div>

            {/* Risk Only Toggle */}
            <button
              onClick={() => {
                setRiskOnly(!riskOnly)
                setPage(0)
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors cursor-pointer ${
                riskOnly
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-obsidian border-white/10 text-platinum/50 hover:text-platinum/70"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Risk Only
            </button>

            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-platinum/30" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-obsidian border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-platinum placeholder:text-platinum/30 focus:outline-none focus:border-electric/50"
              />
            </div>
          </div>
        </div>

        {/* ---- Log Table ---- */}
        <div className="glass-card rounded-xl overflow-hidden border border-white/10">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-platinum flex items-center gap-2">
              <Activity className="w-4 h-4 text-electric/70" />
              Security Events
              <span className="text-platinum/30 text-xs font-normal">
                ({filteredLogs.length} entries)
              </span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-obsidian/50 border-b border-white/5">
                <tr>
                  <th className="p-4 font-semibold text-platinum/50 text-xs uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="p-4 font-semibold text-platinum/50 text-xs uppercase tracking-wider">
                    Event
                  </th>
                  <th className="p-4 font-semibold text-platinum/50 text-xs uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="p-4 font-semibold text-platinum/50 text-xs uppercase tracking-wider">
                    Entities Detected
                  </th>
                  <th className="p-4 font-semibold text-platinum/50 text-xs uppercase tracking-wider">
                    Sanitized Preview
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-6 h-6 text-electric/50 animate-spin" />
                        <span className="text-platinum/40">Loading security events...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ShieldAlert className="w-6 h-6 text-red-400/50" />
                        <span className="text-red-400/70">{error}</span>
                        <Button variant="ghost" size="sm" onClick={fetchLogs}>
                          Retry
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Shield className="w-8 h-8 text-platinum/10" />
                        <span className="text-platinum/30">
                          No security events recorded in this period.
                        </span>
                        <span className="text-platinum/20 text-xs">
                          Run some agent requests through the proxy to see logs here.
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, i) => (
                    <tr key={log.id || i} className="hover:bg-white/[0.02] transition-colors">
                      {/* Timestamp */}
                      <td className="p-4 text-platinum/50 whitespace-nowrap text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-platinum/20" />
                          {log.timestamp
                            ? new Date(log.timestamp).toLocaleString()
                            : "N/A"}
                        </div>
                      </td>

                      {/* Event Type */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${getEventBadge(
                            log.event
                          )}`}
                        >
                          {log.event === "request_blocked" && (
                            <ShieldAlert className="w-3 h-3" />
                          )}
                          {log.event === "prompt_sanitized" && (
                            <ShieldCheck className="w-3 h-3" />
                          )}
                          {log.event.replace(/_/g, " ")}
                        </span>
                      </td>

                      {/* Risk Indicator */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            log.risk_detected
                              ? "text-red-400"
                              : "text-platinum/30"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              log.risk_detected
                                ? "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]"
                                : "bg-platinum/20"
                            }`}
                          />
                          {log.risk_detected ? "Detected" : "Clean"}
                        </span>
                      </td>

                      {/* Entities */}
                      <td className="p-4">
                        {log.entities_blocked?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {log.entities_blocked.map((entity, j) => (
                              <span
                                key={j}
                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-platinum/60 border border-white/5"
                              >
                                {entity.replace(/_/g, " ")}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-platinum/20">&mdash;</span>
                        )}
                      </td>

                      {/* Sanitized Snippet */}
                      <td className="p-4 max-w-sm">
                        <p className="text-platinum/40 font-mono text-[11px] leading-relaxed truncate">
                          {log.sanitized_snippet || "\u2014"}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && !error && logs.length > 0 && (
            <div className="px-5 py-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 rounded-lg text-xs text-platinum/50 border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Previous
              </button>
              <span className="text-platinum/30 text-xs">
                Page {page + 1} &middot; Showing {(page * pageSize) + 1}&ndash;{Math.min((page + 1) * pageSize, logs.length)} of {logs.length}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={logs.length < pageSize}
                className="px-3 py-1.5 rounded-lg text-xs text-platinum/50 border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* ---- Footer Note ---- */}
        <div className="mt-6 text-center">
          <p className="text-platinum/20 text-xs flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3" />
            All data shown here is sanitized. Original PII is never exposed to the browser.
          </p>
        </div>
      </div>
    </main>
  )
}
