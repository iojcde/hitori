import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleOnboardingForm } from "./handleOnboardingForm";

const OnboardingPage = () => {
  return (
    <div className=" container mt-16">
      <h1 className="text-3xl font-bold">Onboarding </h1>

      <form action={handleOnboardingForm} className="mt-8 max-w-sm">
        <Label htmlFor="name">Your Name</Label>
        <Input
          required
          className="mt-2"
          name="name"
          placeholder="Hatsune Miku"
        />
      </form>
    </div>
  );
};

export default OnboardingPage;
