import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, MessageSquare, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { siteConfig } from '../data/site';
import { projectsData } from '../data/projects';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulated form submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Appointment Request:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <section className="py-24 sm:py-32 bg-surface/30 border-t border-line relative overflow-hidden" id="contact">
      <div className="bp-floor opacity-70" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Details & Consultation Value */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <SectionLabel number="10" label="FREE CAREER COUNSELLING" />
              <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.06]">
                Let's build <br />
                <span className="text-accent">your career.</span>
              </h2>
              <p className="mt-3 font-mono text-sm text-text/90">
                Free counselling, same-day call back from our admissions team.
              </p>
            </div>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Book a 1-on-1 counselling session at our SR Nagar institute or on a call. We look at your education background, career goals and schedule, and recommend the right program and batch.
            </p>

            {/* Consultation Highlights */}
            <div className="space-y-3 font-mono text-xs text-text/90">
              <div className="flex items-start gap-3 p-3.5 bg-surface/60 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-text">Course & Career Discovery</div>
                  <div className="text-muted text-[11px] mt-0.5">IT, Healthcare, Engineering or Digital — matched to your background</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-surface/60 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-text">Batch, Mode & Fee Details</div>
                  <div className="text-muted text-[11px] mt-0.5">Online or classroom, weekday or weekend batches</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-surface/60 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-text">Placement Roadmap</div>
                  <div className="text-muted text-[11px] mt-0.5">Certification, resume, mock interviews and job referrals</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="pt-4 border-t border-line space-y-2 font-mono text-xs text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Ramakrishna Nivas, beside Vyjayanthi Hospitals, SR Nagar, Hyderabad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${siteConfig.contact.phonePrimary}`} className="text-text hover:text-accent">
                  {siteConfig.contact.phonePrimary}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: React Hook Form */}
          <div data-reveal className="lg:col-span-7 bg-surface/60 border border-line rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(70,48,18,0.20)]">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 bg-accent/20 border border-accent rounded-full flex items-center justify-center text-accent">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-headline font-extrabold text-2xl text-text">
                  Counselling Request Received
                </h3>
                <p className="text-muted text-sm max-w-md font-mono">
                  Thank you! Our admissions team will call you back to discuss courses, batch timings and fees.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-xs text-accent uppercase tracking-widest underline underline-offset-4 pt-2"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="font-mono text-xs text-accent uppercase tracking-widest flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-accent" />
                  <span>COURSE ENQUIRY FORM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      {...register('fullName', { required: 'Name is required' })}
                      className="w-full bg-bg border border-line px-4 py-3 font-mono text-xs text-text placeholder:text-muted/50 rounded-xl focus:outline-none focus:border-accent"
                    />
                    {errors.fullName && (
                      <span className="font-mono text-[10px] text-accent">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9+\s-]{8,15}$/,
                          message: 'Please enter a valid phone number',
                        },
                      })}
                      className="w-full bg-bg border border-line px-4 py-3 font-mono text-xs text-text placeholder:text-muted/50 rounded-xl focus:outline-none focus:border-accent"
                    />
                    {errors.phone && (
                      <span className="font-mono text-[10px] text-accent">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Please enter a valid email',
                        },
                      })}
                      className="w-full bg-bg border border-line px-4 py-3 font-mono text-xs text-text placeholder:text-muted/50 rounded-xl focus:outline-none focus:border-accent"
                    />
                    {errors.email && (
                      <span className="font-mono text-[10px] text-accent">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Location of Plot */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Education Background
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech, Diploma, ITI, B.Sc"
                      {...register('education')}
                      className="w-full bg-bg border border-line px-4 py-3 font-mono text-xs text-text placeholder:text-muted/50 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Course *
                  </label>
                  <select
                    {...register('course', { required: 'Please select a course' })}
                    className="w-full bg-bg border border-line px-4 py-3 font-mono text-xs text-text rounded-xl focus:outline-none focus:border-accent"
                  >
                    <option value="">Select a course</option>
                    {projectsData.map((p) => (
                      <option key={p.slug} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Not sure">Not sure — help me choose</option>
                  </select>
                  {errors.course && (
                    <span className="font-mono text-[10px] text-accent">
                      {errors.course.message}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Your Goals / Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us your career goal, preferred batch (weekday / weekend / online) or any questions..."
                    {...register('message')}
                    className="w-full bg-bg border border-line px-4 py-3 font-mono text-xs text-text placeholder:text-muted/50 rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon="diagonal"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? 'Sending...' : 'Book Free Counselling'}
                  </Button>
                </div>

                <div className="font-mono text-[10px] text-muted text-center pt-2">
                  Strict privacy protocol. Your phone and email are never shared.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={siteConfig.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-[0_5px_25px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out font-mono text-xs uppercase tracking-wider px-0 group-hover:px-2 font-bold text-white">
          CHAT WITH US
        </span>
      </a>
    </section>
  );
}

