import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthButton from "@/components/AuthButton"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

interface UserForm {
    name: string
    email: string
    password: string
}

export function SignupForm() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<UserForm>({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log(data);
            console.log(response);

            if (data.statusCode === 201) {
                navigate('/signin')
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                })
                setIsLoading(false)
                toast({
                    title: 'Success',
                    description: 'User created successfully',
                });

            }

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    return (
        <div className="w-full  lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]">
            <div className="flex items-center justify-center ">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Signup</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to Signup to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Allen"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Allen@gmail.com"
                                required
                                onChange={handleChange}

                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" name="password" type="password" required onChange={handleChange} />
                        </div>
                        <Button type="button" className="w-full" disabled={isLoading} onClick={handleSubmit} >
                            Signup
                        </Button>
                        <AuthButton />

                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signin" className="hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src="https://plus.unsplash.com/premium_photo-1680363252716-06de41b590dc?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
