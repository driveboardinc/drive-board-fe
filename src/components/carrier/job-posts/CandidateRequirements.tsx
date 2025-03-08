'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CandidateRequirements() {
  const [needMCDOT, setNeedMCDOT] = useState<string>('optional');
  const [needOwnVehicle, setNeedOwnVehicle] = useState<string>('optional');
  const [vehicleType, setVehicleType] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('');
  const [needBackgroundCheck, setNeedBackgroundCheck] =
    useState<boolean>(false);
  const [needDrugTest, setNeedDrugTest] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Candidate Requirements</h2>

      <div>
        <Label>Do you need Candidates who have a MC & DOT?</Label>
        <RadioGroup value={needMCDOT} onValueChange={setNeedMCDOT}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="mc-dot-yes" />
              <Label htmlFor="mc-dot-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="mc-dot-no" />
              <Label htmlFor="mc-dot-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="optional" id="mc-dot-optional" />
              <Label htmlFor="mc-dot-optional">Optional</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Do you need Candidates with their own vehicle?</Label>
        <RadioGroup value={needOwnVehicle} onValueChange={setNeedOwnVehicle}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="own-vehicle-yes" />
              <Label htmlFor="own-vehicle-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="own-vehicle-no" />
              <Label htmlFor="own-vehicle-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="optional" id="own-vehicle-optional" />
              <Label htmlFor="own-vehicle-optional">Optional</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {needOwnVehicle === 'yes' && (
        <div>
          <Label>What type of vehicle?</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Semi Truck',
              'Box Truck',
              'Cargo Van',
              'Cube Truck',
              'SUV',
              'Sedan',
            ].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`vehicle-${type}`}
                  checked={vehicleType.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setVehicleType([...vehicleType, type]);
                    } else {
                      setVehicleType(vehicleType.filter((t) => t !== type));
                    }
                  }}
                />
                <Label htmlFor={`vehicle-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>How Many Years of Experience?</Label>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-experience">
              No Experience Required
            </SelectItem>
            <SelectItem value="1-3-years">1-3 Years</SelectItem>
            <SelectItem value="5-years-plus">5 years+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="background-check"
            checked={needBackgroundCheck}
            onCheckedChange={(checked) =>
              setNeedBackgroundCheck(checked as boolean)
            }
          />
          <Label htmlFor="background-check">
            Does the Driver need to take a Background Check?
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="drug-test"
            checked={needDrugTest}
            onCheckedChange={(checked) => setNeedDrugTest(checked as boolean)}
          />
          <Label htmlFor="drug-test">
            Does the Driver need to take a Drug Test?
          </Label>
        </div>
      </div>

      {needOwnVehicle === 'no' && (
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-semibold mb-2">AI Pre-Screening</h3>
          <p className="text-sm mb-2">
            Would you like our AI Intelligence to Pre-Screen the Drivers&apos;
            Resumes to ensure you&apos;re seeing only qualified candidates?
          </p>
          <p className="text-sm mb-2">
            (There will also be a tab that allows you to check yourself for
            candidates we didn&apos;t see qualifications for)
          </p>
          <p className="text-sm font-semibold">
            Charge will be $29.99 per month
          </p>
        </div>
      )}
    </div>
  );
}
