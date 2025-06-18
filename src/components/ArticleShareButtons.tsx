// components/ArticleShareButtons.tsx
"use client";

import { useState } from "react";
// Import Lucide Icons
import {
  Copy,     // For copy icon
  Check,    // For copied success icon
  // Share2,   // A generic share icon, could be used for WhatsApp/Telegram if specific ones aren't available or for a general share button
  MessageSquareText, // Good for WhatsApp (message square)
  Send,     // Good for Telegram (send icon)
  Instagram, // Direct Instagram icon
} from "lucide-react";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Assuming you have shadcn/ui tooltips

interface ArticleShareButtonsProps {
  articleTitle: string;
  articleUrl: string;
}

export default function ArticleShareButtons({
  articleTitle,
  articleUrl,
}: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    });
  };

  // Encoding the URL and title for sharing
  const encodedArticleTitle = encodeURIComponent(articleTitle);
  const encodedArticleUrl = encodeURIComponent(articleUrl);

  // WhatsApp share URL (web + mobile compatible)
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedArticleTitle}%20${encodedArticleUrl}`;

  // Telegram share URL (web + mobile compatible)
  const telegramShareUrl = `https://t.me/share/url?url=${encodedArticleUrl}&text=${encodedArticleTitle}`;

  // Instagram: Direct sharing to feed/stories isn't supported via simple URLs.
  // Users typically share content by manually uploading or using app-specific sharing.
  // For web, a link to the profile or a "follow us" link is more common than article share.
  // We'll include a placeholder or link to your Instagram profile if desired.
  const instagramProfileUrl = "https://www.instagram.com/your_kerala_psc_live_profile"; // **Update with your actual Instagram profile URL**

  return (
    <div className="flex items-center gap-4 my-6">
      <span className="font-semibold text-gray-700">Share this article:</span>
      <div className="flex gap-3">
        <TooltipProvider>
          {/* Copy Link */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                aria-label="Copy article link"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy Link"}</p>
            </TooltipContent>
          </Tooltip>

          {/* WhatsApp */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                aria-label="Share on WhatsApp"
              >
                <MessageSquareText className="h-5 w-5" /> {/* Using MessageSquareText for WhatsApp */}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on WhatsApp</p>
            </TooltipContent>
          </Tooltip>

          {/* Telegram */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={telegramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                aria-label="Share on Telegram"
              >
                <Send className="h-5 w-5" /> {/* Using Send for Telegram */}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on Telegram</p>
            </TooltipContent>
          </Tooltip>

          {/* Instagram - Note: Direct article sharing is not common. Linking to profile is an alternative. */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={instagramProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200"
                aria-label="View our Instagram"
              >
                <Instagram className="h-5 w-5" /> {/* Using Instagram icon directly */}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View our Instagram</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}