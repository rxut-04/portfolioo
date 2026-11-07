import { GradientText } from "@/components/ui/text-gradient";

export default function Default() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center bg-white dark:bg-black">
      <p className="text-4xl font-semibold tracking-tight text-black dark:text-white">
        Build <GradientText>beautiful</GradientText> products
      </p>
    </div>
  );
}
