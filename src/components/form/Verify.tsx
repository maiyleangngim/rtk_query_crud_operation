"use client";

import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerifyUserMutation } from "@/services/auth";

const formSchema = z.object({
    token: z.string().min(1, "Token is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function VerifyEmailForm() {
    const [verifyUser, { isLoading }] = useVerifyUserMutation();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: "",
        },
    });

    const onSubmit = async (values: FormData) => {
        try {
            const result = await verifyUser({
                token: values.token,
            }).unwrap();

            console.log("Verification Success:", result);

            // Optional
            form.reset();
        } catch (error) {
            console.error("Verification Failed:", error);
        }
    };

    const onReset = () => {
        form.reset();
        form.clearErrors();
    };

    return (
        <div className="container mx-auto max-w-xl py-10">
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="text-xl font-semibold">
                    Verify Email
                </h2>
                <p className="text-sm text-muted-foreground">
                    Enter your verification token
                </p>
            </div>

            <Controller
                control={form.control}
                name="token"
                render={({ field, fieldState }) => (
                    <Field
                        className="flex flex-col gap-2"
                        data-invalid={fieldState.invalid}
                    >
                        <FieldLabel>Token</FieldLabel>

                        <Input
                            placeholder="Enter your token"
                            type="text"
                            {...field}
                        />

                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="flex gap-2">
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                >
                    {isLoading ? "Verifying..." : "Verify Email"}
                </Button>

                <Button
                    type="reset"
                    variant="outline"
                    disabled={isLoading}
                >
                    Reset
                </Button>
            </div>
        </form>
        </div>

    );
}