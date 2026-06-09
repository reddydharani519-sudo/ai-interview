"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, CameraOff, User } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";

export const CameraFeed = () => {
  const { videoRef, isActive, error, startCamera, stopCamera } = useCamera();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl overflow-hidden relative"
      style={{ aspectRatio: "16/9" }}
    >
      {/* Video Feed */}
      {isActive ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center
          justify-center gap-3 bg-white/3"
        >
          <User className="w-12 h-12 text-white/20" />
          <p className="text-white/30 text-sm">
            {error || "Camera not active"}
          </p>
        </div>
      )}

      {/* Overlay Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        {/* User Label */}
        <div
          className="flex items-center gap-2 px-3 py-1.5
          rounded-xl bg-black/50 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-white text-xs font-medium">You</span>
        </div>

        {/* Camera Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isActive ? stopCamera : startCamera}
          className="p-2 rounded-xl bg-black/50 backdrop-blur-sm
            hover:bg-black/70 transition-colors"
        >
          {isActive ? (
            <Camera className="w-4 h-4 text-white" />
          ) : (
            <CameraOff className="w-4 h-4 text-red-400" />
          )}
        </motion.button>
      </div>

      {/* Recording Indicator */}
      {isActive && (
        <div className="absolute top-3 left-3">
          <div
            className="flex items-center gap-1.5 px-2 py-1
            rounded-lg bg-red-500/80 backdrop-blur-sm"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
            <span className="text-white text-xs font-medium">LIVE</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CameraFeed;