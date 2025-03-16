"use client";

import { useEffect, useState } from "react";
import { withDriverAuth } from "@/components/auth/hocs/withDriverAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Badge } from "@/components/ui/badge";
import { setCredentials } from "@/store/slice/authSlice";

interface DriverProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birthday: string;
  vehicle_type: string;
  vehicle_year: number;
  vehicle_make: string;
  vehicle_model: string;
  dot: string;
  mc: string;
  experience: number;
  accidents: number;
  zip_code: string;
  availability: string;
  recent_felony: boolean;
  misdemeanor_felony_3_details: string;
  past_felony: boolean;
  misdemeanor_felony_7_details: string;
  speeding_tickets: number;
  dui: boolean;
  date_created: string;
  user: number;
}

const ProfileField = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <div className="col-span-12 sm:col-span-6 space-y-1.5">
    <p className="text-sm text-muted-foreground font-medium">{label}</p>
    <p className="text-sm">
      {typeof value === "boolean" ? (
        <Badge variant={value ? "default" : "secondary"}>{value ? "Yes" : "No"}</Badge>
      ) : (
        value
      )}
    </p>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="space-y-1.5">
    <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
    <Separator className="my-4" />
  </div>
);

const ProfileSettings = () => {
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { accessToken, refreshToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        "http://ec2-44-211-136-154.compute-1.amazonaws.com:8000/api/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      dispatch(setCredentials({ accessToken: data.access, refreshToken }));
      return data.access;
    } catch (err) {
      console.error("Token refresh error:", err);
      throw err;
    }
  };

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch(
        "http://ec2-44-211-136-154.compute-1.amazonaws.com:8000/api/driver/profile/",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const newToken = await refreshAccessToken();
          return fetchProfile(newToken); // Retry with new token
        }
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchProfile(accessToken);
    }
  }, [accessToken]);

  if (error) {
    return <p className="text-destructive">Error: {error}</p>;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage your driver profile information</p>
      </div>

      <Card className="border-border/40">
        <CardContent className="space-y-8 pt-6">
          <div>
            <SectionHeader title="Personal Information" />
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <ProfileField label="First Name" value={profile.first_name} />
              <ProfileField label="Last Name" value={profile.last_name} />
              <ProfileField label="Email" value={profile.email} />
              <ProfileField label="Phone Number" value={profile.phone_number} />
              <ProfileField label="Birthday" value={profile.birthday} />
              <ProfileField label="ZIP Code" value={profile.zip_code} />
            </div>
          </div>

          <div>
            <SectionHeader title="Vehicle Information" />
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <ProfileField label="Vehicle Type" value={profile.vehicle_type} />
              <ProfileField label="Vehicle Year" value={profile.vehicle_year} />
              <ProfileField label="Vehicle Make" value={profile.vehicle_make} />
              <ProfileField label="Vehicle Model" value={profile.vehicle_model} />
              <ProfileField label="DOT Number" value={profile.dot} />
              <ProfileField label="MC Number" value={profile.mc} />
            </div>
          </div>

          <div>
            <SectionHeader title="Experience & History" />
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <ProfileField label="Years of Experience" value={`${profile.experience} years`} />
              <ProfileField label="Number of Accidents" value={profile.accidents} />
              <ProfileField label="Availability" value={profile.availability} />
              <ProfileField label="Recent Felony" value={profile.recent_felony} />
              <ProfileField label="Past Felony" value={profile.past_felony} />
              {profile.misdemeanor_felony_7_details && (
                <ProfileField label="Felony Details" value={profile.misdemeanor_felony_7_details} />
              )}
              <ProfileField label="Speeding Tickets" value={profile.speeding_tickets} />
              <ProfileField label="DUI" value={profile.dui} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withDriverAuth(ProfileSettings);
