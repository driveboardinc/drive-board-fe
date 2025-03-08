"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ContactInfo = ({ icon, title, details }: { icon: React.ReactNode; title: string; details: string }) => (
  <div className="flex items-center space-x-4 mb-6">
    <div className="text-primary">{icon}</div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-muted-foreground">{details}</p>
    </div>
  </div>
);

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send Message
          <Send className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
}

export default function Contact() {
  const [formState, formAction] = useFormState(submitContactForm, {} as ContactFormState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (formState.success) {
      setShowSuccessMessage(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (formState.errors?._form) {
      toast({
        variant: "destructive",
        title: "Error",
        description: formState.errors._form[0],
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [formState]);

  return (
    <>
      <Navbar />
      <div className="px-[260px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-5 ">
        <div className="py-4">
          <h1 className="text-[100px] text-custom-purple font-bold">Contact Us</h1>
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in touch with our support team
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 shadow-none border-none">
              {showSuccessMessage ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-medium mb-2">Thank You!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your message has been sent successfully. We&apos;ll get back to you soon.
                  </p>
                  <Button onClick={() => setShowSuccessMessage(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form action={formAction} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input id="name" name="name" placeholder="Your name" aria-describedby="name-error" />
                      {formState.errors?.name && (
                        <p id="name-error" className="text-sm text-red-500 mt-1">
                          {formState.errors.name[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        aria-describedby="email-error"
                      />
                      {formState.errors?.email && (
                        <p id="email-error" className="text-sm text-red-500 mt-1">
                          {formState.errors.email[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        aria-describedby="subject-error"
                      />
                      {formState.errors?.subject && (
                        <p id="subject-error" className="text-sm text-red-500 mt-1">
                          {formState.errors.subject[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message..."
                        className="min-h-[150px]"
                        aria-describedby="message-error"
                      />
                      {formState.errors?.message && (
                        <p id="message-error" className="text-sm text-red-500 mt-1">
                          {formState.errors.message[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <SubmitButton />
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 shadow-none border-none">
                <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>

                <ContactInfo icon={<Phone className="h-5 w-5" />} title="Phone" details="+1 (555) 123-4567" />

                <ContactInfo
                  icon={<Mail className="h-5 w-5" />}
                  title="Email"
                  details="support@truckingplatform.com"
                />

                <ContactInfo
                  icon={<MapPin className="h-5 w-5" />}
                  title="Address"
                  details="123 Trucking Street, Transport City, TC 12345"
                />

                <ContactInfo
                  icon={<Clock className="h-5 w-5" />}
                  title="Business Hours"
                  details="Monday - Friday, 9:00 AM - 6:00 PM EST"
                />
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 shadow-none border-none">
                <h2 className="text-xl font-semibold mb-4">Quick Response</h2>
                <p className="text-muted-foreground">
                  We typically respond within 24 hours during business days. For urgent matters, please call
                  our support line.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
