// RegisterForm.js
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '@/api/api';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { registerUser } = useApi();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!data.email.endsWith('@stud.noroff.no')) {
      alert('Only stud.noroff.no email addresses are allowed.');
      return;
    }
    setIsLoading(true);
    try {
      await registerUser(data);
      router.push('/login');
    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      <input {...register('email', { required: true })} placeholder="Email" />
      <input {...register('password', { required: true })} placeholder="Password" type="password" />
      <label>
        <input type="checkbox" {...register('venueManager')} />
        Register as Venue Manager
      </label>
      <button type="submit" disabled={isLoading}>Register</button>
      {errors.email && <span>This field is required</span>}
      {errors.password && <span>This field is required</span>}
    </form>
  );
};

export default RegisterForm;
