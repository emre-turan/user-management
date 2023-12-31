"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import AuthProviderButton from "../auth-provider-buttons";

const FormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    surname: z.string().min(1, "Surname is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      const signInData = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!signInData?.error) {
        toast({
          title: "Success",
          description: "You have successfully registered!",
        });
        router.refresh();
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "An error occurred while signing in.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "You have entered an invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-24 w-[400px] rounded-lg border px-6 py-8 shadow-xl">
      <Form {...form}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-2 gap-6">
          <AuthProviderButton provider="github">Sign Up</AuthProviderButton>
          <AuthProviderButton provider="google">Sign Up</AuthProviderButton>
        </div>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly text-sm text-muted-foreground before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px  after:flex-grow after:bg-stone-400">
          or continue with
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Enter your password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-6 w-full" type="submit">
            Create Account
          </Button>
        </form>
        <p className="mt-2 text-center text-sm text-muted-foreground ">
          Do you have an account? Please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
