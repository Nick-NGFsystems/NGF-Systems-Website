import Section from '@/components/ui/Section'
import ScreenshotSlot from '@/components/ui/ScreenshotSlot'
import { Tick } from '@/components/ui/FeatureItem'

/**
 * The booking row. Mirrors WhatYouGet — image on the left this time — so the
 * two portal sections alternate rather than stacking the same way twice.
 *
 * Everything claimed here is in NGF-Systems-app: weekly hours and time off
 * (AvailabilityRule, BlackoutDate), confirmations by email or text
 * (BookingConfig.sms_sender), the self-service reschedule link
 * (Appointment.manage_token) and the optional approval hold
 * (require_approval). Booking takes no payment, so nothing here says it does.
 */
export default function Bookings() {
  return (
    <Section id="bookings">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        {/* `self-start` and the aspect ratio both matter. The frame takes the
            shot's own ratio (SHOTS.bookings.size, 1290x740) because
            ScreenshotSlot is object-cover and any other shape crops the day
            names off the left or the services off the bottom; without
            `self-start` the grid stretches this column to the height of the
            text beside it and the extra shows as a white band under the
            picture. Change the ratio if you re-capture at another size. */}
        <div className="order-2 aspect-[1290/740] self-start overflow-hidden rounded-[18px] shadow-[inset_0_0_0_1px_rgba(16,24,40,.08),0_12px_30px_-14px_rgba(16,24,40,.18)] lg:order-1">
          <ScreenshotSlot shot="bookings" />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sand">
            If you take appointments
          </p>
          <h2 className="mt-3 text-[30px] font-medium leading-[1.14] tracking-[-0.03em] text-head sm:text-[36px]">
            Customers book themselves, at 11pm if they like.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.62] text-muted">
            Your services, your weekly hours and your time off, and every appointment in one place.
            You stop losing evenings to phone tag.
          </p>
          <ul className="mt-8 space-y-3.5">
            <Tick>Confirmations by email or text, with a link to reschedule</Tick>
            <Tick>Hold every booking for your approval first, if you want to</Tick>
            <Tick>Cancel or move an appointment from your portal</Tick>
          </ul>
        </div>
      </div>
    </Section>
  )
}
