import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { CheckCircle, Loader2 } from "lucide-react";
import { api } from "../../lib/api";

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    preferredPlan: "basic"
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    
    try {
      const response = await api.post("/api/waitlist", formData);
      
      if (response.data.success) {
        setStatus("success");
        if (onSuccess) onSuccess();
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            preferredPlan: "basic"
          });
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
        setErrorMessage(response.data.message || "Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Waitlist submission error:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="bg-black/50 border-teal-500/20 text-white"
          disabled={status === "submitting" || status === "success"}
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          className="bg-black/50 border-teal-500/20 text-white"
          disabled={status === "submitting" || status === "success"}
        />
      </div>
      
      <div>
        <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Your phone number"
          className="bg-black/50 border-teal-500/20 text-white"
          disabled={status === "submitting" || status === "success"}
        />
      </div>
      
      <div>
        <Label htmlFor="preferredPlan">Preferred Plan</Label>
        <Select 
          name="preferredPlan" 
          value={formData.preferredPlan}
          onValueChange={(value) => setFormData(prev => ({ ...prev, preferredPlan: value }))}
          disabled={status === "submitting" || status === "success"}
        >
          <SelectTrigger className="bg-black/50 border-teal-500/20 text-white">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-teal-500/20 text-white">
            <SelectItem value="basic">Basic (Free)</SelectItem>
            <SelectItem value="gold">Gold (Paid)</SelectItem>
            <SelectItem value="enterprise">Enterprise (Contact Us)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {status === "error" && (
        <div className="p-3 bg-red-950/20 rounded-lg border border-red-500/20 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}
      
      <Button
        type="submit"
        className={`w-full text-white ${
          status === "success"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
        }`}
        disabled={status === "submitting" || status === "success"}
      >
        {status === "submitting" && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {status === "success" && (
          <CheckCircle className="mr-2 h-4 w-4" />
        )}
        {status === "idle" && "Join Waitlist"}
        {status === "submitting" && "Submitting..."}
        {status === "success" && "Successfully Joined!"}
        {status === "error" && "Try Again"}
      </Button>
    </form>
  );
};
