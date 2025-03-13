"use client";
import styles from "../_css/signup.module.css";
import Image from "next/image";
import ImgLogo from "@/../../public/images/logo.svg";
import StepProgressBar from "@/app/_components/progressbar/StepProgressBar";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Completed from "./Completed";
// import Link from "next/link";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(299); //(4분 59초)

  return (
    <section className={styles.page}>
      {step !== 4 && (
        <div className={styles.signup_wrap}>
          <h1 className={styles.logo_wrap}>
            {/* <Link href={"./"}> */}
            <Image
              src={ImgLogo}
              alt="logo image"
              loading="lazy"
              property={"public/images/logo.svg"}
              width={69}
              height={51}
            />
            {/* </Link> */}
          </h1>
          <StepProgressBar totalSteps={3} currentStep={step} />
          {step == 1 && <Step1 setStep={setStep} setEmail={setEmail} />}
          {step == 2 && (
            <Step2
              setStep={setStep}
              email={email}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
            />
          )}
          {step == 3 && <Step3 setStep={setStep} />}
        </div>
      )}
      {step == 4 && <Completed />}
    </section>
  );
}
