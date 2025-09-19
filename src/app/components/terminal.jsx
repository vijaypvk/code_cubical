
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export default function TerminalDemo() {
  const TypingAnimation = ({
    children,
    className,
    duration = 50,
    delay = 0,
    as: Component = "span",
    ...props
  }) => {
    if (typeof children !== "string") {
      throw new Error("TypingAnimation: children must be a string.");
    }

    const MotionComponent = motion(Component);
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
      if (!started) return;
      let i = 0;
      const interval = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, duration);
      return () => clearInterval(interval);
    }, [started, children, duration]);

    return (
      <MotionComponent
        className={cn("whitespace-pre-wrap", className)}
        {...props}
      >
        {displayedText}
      </MotionComponent>
    );
  };

  const AnimatedSpan = ({ children, delay = 0, className, ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className={cn("text-sm font-mono tracking-tight", className)}
      {...props}
    >
      {children}
    </motion.div>
  );

  const Terminal = ({ children, className }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-700 bg-black/60 p-0 shadow-2xl backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-700 bg-black/20 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-auto text-xs text-zinc-400 font-mono tracking-wide">
          cloudpulse@init
        </span>
      </div>
      <pre className="px-6 py-4 text-sm text-zinc-100 font-mono leading-relaxed">
        <code className="grid gap-1">{children}</code>
      </pre>
    </motion.div>
  );

  return (
    // <div className="flex items-center justify-center min-h-[400px] px-4 py-8">
    //   <Terminal>
    //     <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

    //     <AnimatedSpan delay={1500} className="text-green-400">
    //       ✔ Preflight checks.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={2000} className="text-green-400">
    //       ✔ Verifying framework. Found Next.js.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={2500} className="text-green-400">
    //       ✔ Validating Tailwind CSS.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={3000} className="text-green-400">
    //       ✔ Validating import alias.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={3500} className="text-green-400">
    //       ✔ Writing components.json.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={4000} className="text-green-400">
    //       ✔ Checking registry.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={4500} className="text-green-400">
    //       ✔ Updating tailwind.config.ts
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={5000} className="text-green-400">
    //       ✔ Updating app/globals.css
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={5500} className="text-green-400">
    //       ✔ Installing dependencies.
    //     </AnimatedSpan>
    //     <AnimatedSpan delay={6000} className="text-blue-400">
    //       ℹ Updated 1 file:
    //       <span className="pl-4 text-zinc-400">- lib/utils.ts</span>
    //     </AnimatedSpan>
    //     <TypingAnimation delay={6500} className="text-zinc-400">
    //       Success! Project initialization completed.
    //     </TypingAnimation>
    //     <TypingAnimation delay={7000} className="text-zinc-500">
    //       You may now add components.
    //     </TypingAnimation>
    //   </Terminal>
    // </div>
    <div className="flex items-center justify-center min-h-[200px] px-4 py-4">
  <Terminal>
    <TypingAnimation>&gt; cloudpulse init</TypingAnimation>

    <AnimatedSpan delay={1500} className="text-green-400">
      ✔ Environment check passed.
    </AnimatedSpan>
    <AnimatedSpan delay={2000} className="text-green-400">
      ✔ Found CloudPulse CLI v1.3.7
    </AnimatedSpan>
    <AnimatedSpan delay={2500} className="text-green-400">
      ✔ Detecting framework... Next.js detected
    </AnimatedSpan>
    <AnimatedSpan delay={3000} className="text-green-400">
      ✔ Validating project structure...
    </AnimatedSpan>

    <AnimatedSpan delay={4500} className="text-green-400">
      ✔ Installing platform adapters...
    </AnimatedSpan>
    <AnimatedSpan delay={5000} className="text-green-400">
      ✔ Configuring serverless runtime
    </AnimatedSpan>
    <AnimatedSpan delay={5500} className="text-green-400">
      ✔ Setting up live preview deployment
    </AnimatedSpan>
    <AnimatedSpan delay={6000} className="text-blue-400">
      ℹ Project linked:  
      <span className="pl-4 text-zinc-400">https://cloudpulse.dev/vijay/app</span>
    </AnimatedSpan>
    <TypingAnimation delay={6500} className="text-zinc-400">
      Success! CloudPulse is ready.
    </TypingAnimation>
    <TypingAnimation delay={7000} className="text-zinc-500">
      Run `cloudpulse deploy` to publish your app.
    </TypingAnimation>
  </Terminal>
</div>
  );
}
