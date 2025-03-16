"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, DollarSign, Trophy } from "lucide-react";

interface SponsoredJobAdProps {
  onSave?: (data: { isSponsored: boolean; badges: string[]; isPremier: boolean }) => void;
}

export default function SponsoredJobAd({ onSave }: SponsoredJobAdProps) {
  const [isSponsored, setIsSponsored] = useState(false);
  const [isPremier, setIsPremier] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);

  const handleSponsoredChange = (value: string) => {
    const newValue = value === "yes";
    setIsSponsored(newValue);
    onSave?.({ isSponsored: newValue, badges, isPremier });
  };

  const handlePremierChange = (value: string) => {
    const newValue = value === "yes";
    setIsPremier(newValue);
    onSave?.({ isSponsored, badges, isPremier: newValue });
  };

  const handleBadgeChange = (badge: string) => {
    let newBadges: string[];
    if (badges.includes(badge)) {
      newBadges = badges.filter((b) => b !== badge);
    } else if (badges.length < 2) {
      newBadges = [...badges, badge];
    } else {
      return;
    }
    setBadges(newBadges);
    onSave?.({ isSponsored, badges: newBadges, isPremier });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Ad Options</h2>

      <div>
        <Label>Would you like to sponsor this ad?</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Cost: $60 per Job Ad, sent daily to each driver in the area.
        </p>
        <RadioGroup value={isSponsored ? "yes" : "no"} onValueChange={handleSponsoredChange}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="sponsor-yes" />
              <Label htmlFor="sponsor-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="sponsor-no" />
              <Label htmlFor="sponsor-no">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {isSponsored && (
        <div>
          <Label>Choose up to two badges:</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="badge-urgent"
                checked={badges.includes("urgent")}
                onCheckedChange={() => handleBadgeChange("urgent")}
                disabled={badges.length === 2 && !badges.includes("urgent")}
              />
              <Label htmlFor="badge-urgent" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Urgent</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="badge-high-pay"
                checked={badges.includes("high-pay")}
                onCheckedChange={() => handleBadgeChange("high-pay")}
                disabled={badges.length === 2 && !badges.includes("high-pay")}
              />
              <Label htmlFor="badge-high-pay" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>HIGH PAY</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="badge-top-company"
                checked={badges.includes("top-company")}
                onCheckedChange={() => handleBadgeChange("top-company")}
                disabled={badges.length === 2 && !badges.includes("top-company")}
              />
              <Label htmlFor="badge-top-company" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>TOP COMPANY</span>
              </Label>
            </div>
          </div>
        </div>
      )}

      <div>
        <Label>Would you like a Premier Job Posting?</Label>
        <p className="text-sm text-muted-foreground mb-2">Cost: $99 per Job Listing</p>
        <RadioGroup value={isPremier ? "yes" : "no"} onValueChange={handlePremierChange}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="premier-yes" />
              <Label htmlFor="premier-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="premier-no" />
              <Label htmlFor="premier-no">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {isPremier && (
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-semibold mb-2">Premier Job Posting Benefits:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Get Everything in Sponsored Job Ad</li>
            <li>Drive Board Team will collect the documents you need</li>
            <li>Pre-Screen (with the questions you provide)</li>
            <li>Help Onboard the Driver</li>
            <li>Have your onboarding process on Auto Pilot</li>
          </ul>
        </div>
      )}
    </div>
  );
}
