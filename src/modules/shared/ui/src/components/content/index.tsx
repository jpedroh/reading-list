import { twc } from "react-twc";

export const Content = {
  Root: twc.div`flex flex-col gap-8 w-full md:grid md:grid-cols-[300px_1fr]`,
  Aside: twc.aside`flex flex-col gap-8 sticky bottom-6 self-end w-full md:w-[unset]`,
  Main: twc.main`flex-grow flex flex-col gap-4`,
};
