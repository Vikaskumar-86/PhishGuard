
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    const form = event.currentTarget;
    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setSuccess(true);
      setStatus("Your message has been sent successfully!");
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setSuccess(false);
      setStatus("Message could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <section id="contact" className="mx-auto w-full max-w-3xl p-4 sm:p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contact Support
          </p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Send a Direct Message
          </h1>
          <p className="mt-2 text-slate-600">
            Have a question or need help with PhishGuard? Send us a message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="from_name" className="mb-2 block text-sm font-medium text-slate-700">
              Your Name *
            </label>
            <input
              id="from_name"
              name="from_name"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="from_email" className="mb-2 block text-sm font-medium text-slate-700">
              Your Email *
            </label>
            <input
              id="from_email"
              name="from_email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              maxLength={150}
              placeholder="How can we help?"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={5}
              maxLength={5000}
              rows={5}
              placeholder="Write your message here..."
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : (
              <>➤ Send Message</>
            )}
          </button>

          {status && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-lg p-3 text-sm ${
                success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
