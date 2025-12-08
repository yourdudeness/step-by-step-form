import { fetchForm } from "@/app/api/fetch-form";
import MultiStepForm from "@/features/onboarding/components/multi-step-form";

export default async function Home() {
  const formData = await fetchForm();

  return (
    <>
      <MultiStepForm formData={formData} />
    </>
  );
}
