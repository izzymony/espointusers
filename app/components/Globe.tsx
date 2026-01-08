"use client";

import React from "react";

const Globe = () => {
              return (
                            <div className="relative w-full h-full flex items-center justify-center opacity-40">
                                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] scale-75 animate-pulse-slow" />

                                          <svg
                                                        viewBox="0 0 200 200"
                                                        className="w-[120%] h-[120%] lg:w-[80%] lg:h-[80%] drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                                          >
                                                        <defs>
                                                                      <radialGradient id="globe-gradient" cx="50%" cy="50%" r="50%">
                                                                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                                                                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                                                      </radialGradient>
                                                        </defs>

                                                        {/* Outer Glow */}
                                                        <circle cx="100" cy="100" r="80" fill="url(#globe-gradient)" />

                                                        {/* Sphere Border */}
                                                        <circle
                                                                      cx="100"
                                                                      cy="100"
                                                                      r="80"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      strokeWidth="0.5"
                                                                      className="text-primary/20"
                                                        />

                                                        {/* Latitude Lines */}
                                                        <g className="text-primary/30">
                                                                      <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                                                      <ellipse cx="100" cy="100" rx="80" ry="45" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                                                      <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.3" />
                                                        </g>

                                                        {/* Longitude Lines - Animated */}
                                                        <g className="text-primary/40 animate-spin-slow origin-center">
                                                                      <ellipse cx="100" cy="100" rx="20" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                                                      <ellipse cx="100" cy="100" rx="45" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                                                      <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />

                                                                      {/* Nodes/Dots on Longitude Lines */}
                                                                      <circle cx="100" cy="20" r="1.5" fill="var(--primary)" className="animate-pulse" />
                                                                      <circle cx="100" cy="180" r="1.5" fill="var(--primary)" className="animate-pulse" />
                                                                      <circle cx="145" cy="100" r="1.5" fill="var(--primary)" className="animate-pulse" />
                                                                      <circle cx="55" cy="100" r="1.5" fill="var(--primary)" className="animate-pulse" />
                                                        </g>

                                                        {/* Secondary Longitude Lines - Reverse Animated */}
                                                        <g className="text-primary/20 animate-spin-slow [animation-direction:reverse] origin-center opacity-50">
                                                                      <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                                                      <ellipse cx="100" cy="100" rx="60" ry="80" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                                        </g>
                                          </svg>
                            </div>
              );
};

export default Globe;
