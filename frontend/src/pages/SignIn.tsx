import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthButton from "@/components/AuthButton"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/user/userslice"


interface UserForm {
    name: string
    email: string
}

export function SignInForm() {

    const dispatch = useDispatch()
    const { toast } = useToast()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<UserForm>({
        name: '',
        email: '',

    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.statusCode === 200) {
                dispatch(setUser(data.data))
                navigate('/dashboard')
                setFormData({
                    name: '',
                    email: '',
                })
                setIsLoading(false)
                toast({
                    title: 'Success',
                    description: 'User LoggedIn successfully',
                });

            }

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setError('Error logging in')
        }
    }


    return (
        <div className="w-full  lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]">
            <div className="flex items-center justify-center ">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">SignIn</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to SignIn to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" >Password</Label>
                            </div>
                            <Input id="password" type="password" required name="password" onChange={handleChange} />
                        </div>
                        {error && <p className="text-error">{error}</p>}

                        <Button type="submit" className="w-full" disabled={isLoading} onClick={handleSubmit} >
                            SignIn
                        </Button>
                        <AuthButton />
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
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
