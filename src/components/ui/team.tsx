"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  topic?: string;
  link?: string;
  slug?: string;
  isTbd?: boolean;
};

export type TeamSectionProps = {
  title?: string;
  members: TeamMember[];
  className?: string;
  variant?: "default" | "detailed";
  learnMoreText?: string;
};

const defaultMembers: TeamMember[] = [
  {
    name: "Méschac Irung",
    role: "Creator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Théo Balick",
    role: "Frontend Dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Glodie Lukose",
    role: "Frontend Dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Bernard Ngandu",
    role: "Backend Dev",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
];

export function TeamSection({
  title = "Our team",
  members = defaultMembers,
  learnMoreText = "Learn more",
  className,
  variant = "default",
  description,
}: TeamSectionProps & { description?: string }) {
  if (variant === "detailed") {
    const CardContent = ({ member }: { member: TeamMember }) => (
      <>
        <div className="relative overflow-hidden rounded-xl md:rounded-md md:group-hover:rounded-xl transition-all duration-500">
          <img
            className="h-[22.5rem] w-full object-cover object-top transition-all duration-500 md:h-80 md:group-hover:h-[20rem]"
            src={member.avatar}
            alt={member.name}
            width={826}
            height={1239}
            loading="lazy"
          />
          {/* TBD badge */}
          {member.isTbd && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs font-medium">
              Uskoro
            </div>
          )}
        </div>
        <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
          <h3 className="text-xl font-semibold transition-all duration-500 tracking-wider md:text-lg md:tracking-normal md:group-hover:tracking-wider text-white">
            {member.name}
          </h3>
          <span className="text-white/60 inline-block translate-y-0 text-base font-light opacity-100 transition duration-300 md:text-sm md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 mt-1">
            {member.role}
          </span>
          {member.topic && (
            <p className="text-purple-400 text-sm font-medium mt-2 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 line-clamp-2">
              {member.topic}
            </p>
          )}
          {member.slug && (
            <span className="inline-flex items-center gap-1 text-purple-300 translate-y-0 text-sm tracking-wide opacity-100 transition-all duration-500 mt-3 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              {learnMoreText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </>
    );

    return (
      <section className={cn("py-16 md:py-32", className)}>
        <div className="mx-auto max-w-7xl px-6">
          {/* Mobile: Horizontal Slider */}
          <div className="md:hidden overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {members.map((member, index) => {
                if (member.slug) {
                  return (
                    <Link
                      key={index}
                      href={`/speakers/${member.slug}`}
                      className="group overflow-hidden block w-[280px] flex-shrink-0"
                    >
                      <CardContent member={member} />
                    </Link>
                  );
                }
                return (
                  <div key={index} className="group overflow-hidden w-[280px] flex-shrink-0">
                    <CardContent member={member} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: 4-column Grid */}
          <div className="hidden md:grid gap-x-6 gap-y-12 grid-cols-4">
            {members.map((member, index) => {
              if (member.slug) {
                return (
                  <Link
                    key={index}
                    href={`/speakers/${member.slug}`}
                    className="group overflow-hidden block"
                  >
                    <CardContent member={member} />
                  </Link>
                );
              }

              return (
                <div key={index} className="group overflow-hidden">
                  <CardContent member={member} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-12 md:py-32", className)}>
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl text-foreground">
          {title}
        </h2>

        <div>
          <h3 className="mb-6 text-lg font-medium text-foreground">
            Leadership
          </h3>
          <div className="grid grid-cols-2 gap-4 border-t border-border py-6 md:grid-cols-4">
            {members.slice(0, 4).map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border border-border p-0.5 shadow shadow-zinc-950/5">
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-foreground">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-6 text-lg font-medium text-foreground">
            Engineering
          </h3>
          <div className="grid grid-cols-2 gap-4 border-t border-border py-6 md:grid-cols-4">
            {members.slice(0, 4).map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border border-border p-0.5 shadow shadow-zinc-950/5">
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-foreground">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-6 text-lg font-medium text-foreground">
            Marketing
          </h3>
          <div className="grid grid-cols-2 gap-4 border-t border-border py-6 md:grid-cols-4">
            {members.slice(0, 4).map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border border-border p-0.5 shadow shadow-zinc-950/5">
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-foreground">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

