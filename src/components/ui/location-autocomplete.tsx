"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LocationResult {
  city: string;
  state: string;
  zip_code?: string;
  lat?: number;
  lng?: number;
  formatted_address?: string;
}

interface LocationAutocompleteProps {
  id: string;
  label: string;
  value?: string;
  onChange: (value: string, locationData: LocationResult) => void;
  onLocationSelect?: () => void; // New prop for handling selection
  placeholder?: string;
  required?: boolean;
}

export function LocationAutocomplete({
  id,
  label,
  value = "",
  onChange,
  onLocationSelect, // New prop
  placeholder = "Enter zip code",
  required = false,
}: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState<LocationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!inputValue) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://ec2-44-211-136-154.compute-1.amazonaws.com:8000/api/get_location/?query=${encodeURIComponent(
          inputValue
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.locationData) {
          setLocationData(data.locationData);
          onChange(data.location, data.locationData);
        } else if (data && Array.isArray(data) && data.length > 0) {
          const location = data[0];
          const formattedData: LocationResult = {
            city: location.city,
            state: location.state,
            zip_code: location.zip_code,
            lat: location.lat || 0,
            lng: location.lng || 0,
            formatted_address: `${location.zip_code}, ${location.city}, ${location.state}, USA`,
          };

          setLocationData(formattedData);
          onChange(location.zip_code || inputValue, formattedData);
        } else {
          setError("No location found for the given input");
          setLocationData(null);
        }
      } else {
        throw new Error(`Network response error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setError("Error fetching location data");
      setLocationData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(value);
    setError(null);
    setLocationData(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCardClick = () => {
    if (locationData) {
      // Update form data first
      onChange(inputValue, locationData);
      // Then trigger the location select callback
      if (onLocationSelect) {
        onLocationSelect();
      }
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id={id}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            required={required}
            className="pl-10"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
          />
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        <Button type="button" onClick={handleSearch} disabled={loading || !inputValue}>
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      {locationData && (
        <div className="space-y-4 mt-4">
          <Card
            className="bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
            onClick={handleCardClick}
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-lg">
                    {locationData.city}, {locationData.state}
                  </h3>
                  <p className="text-sm text-muted-foreground">{locationData.formatted_address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
