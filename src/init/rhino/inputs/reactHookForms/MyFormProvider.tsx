// form
import { FormProvider, UseFormReturn } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export default function MyFormProvider({ children, onSubmit, methods }: Props) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
