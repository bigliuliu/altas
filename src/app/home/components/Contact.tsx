import { Checkbox } from "@/components/ui/checkbox";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import React, { useState } from "react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EMAIL_TEMPLATE = 'd-2c2bfabe5887435fa67663635b24b38a';
const TO_ADDRESS = 'lekishonglenn44@gmail.com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${AtlasBackendApi}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: TO_ADDRESS,
          templateId: EMAIL_TEMPLATE,
          dynamicTemplateData: {
            name: formData.name,
            phone: formData.tel,
            email: formData.email,
            message: formData.message,
            date: new Date().toISOString(),
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        tel: '',
        email: '',
        message: ''
      });

    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 bg-gradient-to-r from-[#258C4E] to-[#81DB64] text-white">
      <main className="w-full flex flex-col justify-center items-center text-center pb-5">
        <h1 className="font-semibold text-2xl sm:text-[48px] font-clashDisplay text-white my-[10px]">
          Contact Us
        </h1>
        <h4 className="w-[85%] mb-10">
          Any question or remarks ? Just write us a message
        </h4>
        <article className="w-full md:w-10/12 flex flex-col items-center md:flex-row bg-white text-black rounded-xl p-4">
          <div className="flex flex-col items-start p-10 w-full bg-bottom rounded-xl font-DM">
            <h3 className="font-bold text-3xl mb-3">Contact Information</h3>
            <p className="mb-5">Get in touch with us through:</p>
            <span className="flex mb-5">
              <Phone size={24} color="#0CAF60" weight="bold" />
              <h4>Telephone - +254 720 800 000</h4>
            </span>
            <span className="flex mb-5">
              <EnvelopeSimple size={24} color="#0CAF60" weight="bold" />
              <h4>Email – info@atlas.co.ke</h4>
            </span>
            <span className="flex mb-5">
              <MapPin size={24} color="#0CAF60" weight="bold" />
              <h4>Office – Caxton House, Next to GPO Nairobi</h4>
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-around w-full p-3 mt-5 rounded-xl font-DM border-2 border-[#0CAF60]/60 p-10">
            {status.message && (
              <Alert className={`mb-4 ${status.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
                <AlertDescription>
                  {status.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="h-auto flex flex-col items-start my-2">
              <label
                htmlFor="fullname"
                className="text-[#898CA9] font-semibold"
              >
                FullName
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-sm py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>

            <div className="h-auto flex flex-col items-start my-2">
              <label htmlFor="phone" className="text-[#898CA9] font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                required
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-sm py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>
            <div className="h-auto flex flex-col items-start my-2">
              <label htmlFor="email" className="text-[#898CA9] font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-sm py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>

            <div className="h-auto flex flex-col items-start my-2">
              <label htmlFor="message" className="text-[#898CA9] font-semibold">
                Enter Message
              </label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-sm py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 py-3 px-6 w-full font-semibold border border-[#218B53] rounded-sm bg-[#218B53] text-white hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </article>
      </main>
    </section>
  );
};

export default Contact;