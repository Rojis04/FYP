import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { server } from "../../server"

const AdminSettings = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [site, setSite] = useState({
    siteName: "Elaris Apothecary",
    tagline: "Clarity-first beauty and pharmacy shopping",
    logoUrl: "",
  })

  const [payments, setPayments] = useState({
    stripePublicKey: "",
    khaltiPublicKey: "",
    currency: "NPR",
  })

  const [smtp, setSmtp] = useState({
    host: "",
    port: "465",
    user: "",
  })

  const [roles, setRoles] = useState({
    autoApproveSellers: false,
    requireOrderReview: true,
    allowRefunds: true,
  })

  const disabledSave = useMemo(() => {
    return !profile.name || !profile.email
  }, [profile])

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Settings saved locally for this session.")
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${server}/user/logout`, { withCredentials: true })
      toast.success("Logged out successfully.")
      navigate("/login")
      window.location.reload(true)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log out.")
    }
  }

  return (
    <div className="w-full px-4 md:px-8 pt-6 mt-6 bg-white text-[#0f172a]">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Admin Settings</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#0f172a]">Control Center</h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Manage admin profile, site branding, payments, SMTP, and permissions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">Admin Profile</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Name</label>
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="Admin name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Phone</label>
                <input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">Security</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Current Password</label>
                <input
                  type="password"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">New Password</label>
                <input
                  type="password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Confirm Password</label>
                <input
                  type="password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Site */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">Site Branding</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Site Name</label>
                <input
                  value={site.siteName}
                  onChange={(e) => setSite({ ...site, siteName: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#0f172a]">Tagline</label>
                <input
                  value={site.tagline}
                  onChange={(e) => setSite({ ...site, tagline: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#0f172a]">Logo URL</label>
                <input
                  value={site.logoUrl}
                  onChange={(e) => setSite({ ...site, logoUrl: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Payments */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">Payments</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Stripe Public Key</label>
                <input
                  value={payments.stripePublicKey}
                  onChange={(e) => setPayments({ ...payments, stripePublicKey: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="pk_live_..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Khalti Public Key</label>
                <input
                  value={payments.khaltiPublicKey}
                  onChange={(e) => setPayments({ ...payments, khaltiPublicKey: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="test_public_key_..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Currency</label>
                <select
                  value={payments.currency}
                  onChange={(e) => setPayments({ ...payments, currency: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                >
                  <option value="NPR">NPR</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>
          </div>

          {/* SMTP */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">SMTP</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Host</label>
                <input
                  value={smtp.host}
                  onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">Port</label>
                <input
                  value={smtp.port}
                  onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="465"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f172a]">User</label>
                <input
                  value={smtp.user}
                  onChange={(e) => setSmtp({ ...smtp, user: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">Permissions & Defaults</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 text-sm text-[#0f172a]">
                <input
                  type="checkbox"
                  checked={roles.autoApproveSellers}
                  onChange={(e) => setRoles({ ...roles, autoApproveSellers: e.target.checked })}
                  className="h-4 w-4 rounded border-[#e2e8f0]"
                />
                Auto-approve sellers
              </label>
              <label className="flex items-center gap-3 text-sm text-[#0f172a]">
                <input
                  type="checkbox"
                  checked={roles.requireOrderReview}
                  onChange={(e) => setRoles({ ...roles, requireOrderReview: e.target.checked })}
                  className="h-4 w-4 rounded border-[#e2e8f0]"
                />
                Require order review
              </label>
              <label className="flex items-center gap-3 text-sm text-[#0f172a]">
                <input
                  type="checkbox"
                  checked={roles.allowRefunds}
                  onChange={(e) => setRoles({ ...roles, allowRefunds: e.target.checked })}
                  className="h-4 w-4 rounded border-[#e2e8f0]"
                />
                Allow refunds
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-3 rounded-2xl font-semibold border border-[#e2e8f0] text-[#0f172a] hover:bg-[#f8fafc]"
              >
                Log out
              </button>
              <button
                type="submit"
                disabled={disabledSave}
                className={`px-6 py-3 rounded-2xl font-semibold border ${
                  disabledSave
                    ? "bg-[#f8fafc] text-[#94a3b8] border-[#e2e8f0] cursor-not-allowed"
                    : "bg-[#0f172a] text-white border-[#0f172a] hover:opacity-90"
                }`}
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminSettings
