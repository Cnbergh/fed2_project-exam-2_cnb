'use client';

import Modal, {
  ModalButton,
  ModalOverlay,
  ModalContent,
  ModalClose,
} from './modal';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SignUpModal = () => {

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await fetcher("/api/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success("Account created successfully");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };


  return (
    <>
      <Modal >
        <ModalButton>Sign up</ModalButton>

        <ModalOverlay>
          <ModalContent title="Modal Title">
            


          <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="mt-4">
          <button type="submit" disabled={isLoading} label="Continue" />
        </div>
        <div className="flex flex-col gap-4 mt-3">
          <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex justify-center items-center gap-2">
              <span>Already have an account?</span>
              <span onClick={toggleModal} className="text-neutral-800 cursor-pointer hover:underline">
                Log in
              </span>
            </div>
          </div>
        </div>
      </form>











            <ModalClose>
              cancel
            </ModalClose>
          </ModalContent>
        </ModalOverlay>

      </Modal>
    </>
  );
};

export default SignUpModal;
