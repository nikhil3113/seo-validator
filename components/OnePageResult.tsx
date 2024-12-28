import React from "react";
import {
  isDescriptionSeoFriendly,
  isTitleSeoFriendly,
  SEO_LIMITS,
} from "../lib/helper";

import ToolTipComponent from "./ToolTipComponent";
import { TicketCheck, TicketX } from "lucide-react";

interface OnePageResultProps {
  title: string;
  description: string;
  result?: string;
  setTitle?: (title: string) => void;
  setDescription?: (description: string) => void;
  showForm?: boolean;
}

export default function OnePageResult({
  title,
  description,
  result,
  setTitle,
  setDescription,
  showForm = false
}: OnePageResultProps) {
  const recommendedTitleLength = SEO_LIMITS.title;
  const recommendedDescriptionLength = SEO_LIMITS.description;
  return (
    <div>
      {(title || description || showForm) && (
        <div className="mt-6 ">
          <div>
            <div className="space-y-2 mb-6">
              <h3 className="text-lg font-semibold">Title</h3>
              <p className="text-muted-foreground">
                {title || showForm ? (
                  <input
                    value={title}
                    onChange={(e) => setTitle && setTitle(e.target.value)}
                    className="w-full p-2 rounded-lg border"
                  />
                ) : (
                  "No title found"
                )}
              </p>
              <p className="flex gap-2 items-center w-full">
                Characters: {title ? title.length : 0}
                {!isTitleSeoFriendly(title) ? (
                  <>
                    {title && title.length > recommendedTitleLength.max ? (
                      <ToolTipComponent text="Title character is greater than Recommended limit">
                        <TicketX className="inline-block text-red-500 ml-1 " />
                      </ToolTipComponent>
                    ) : (
                      <ToolTipComponent text="Title character is less than Recommended limit">
                        <TicketX className="inline-block text-red-500 ml-1 " />
                      </ToolTipComponent>
                    )}
                  </>
                ) : (
                  <ToolTipComponent text="Title is SEO friendly">
                    <TicketCheck className="inline-block text-green-500 ml-1" />
                  </ToolTipComponent>
                )}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {description || showForm ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription && setDescription(e.target.value)}
                    className="w-full p-2 rounded-lg border"
                  />
                ) : (
                  "No description found"
                )}
              </p>
              <p className="flex gap-2 items-center">
                Characters: {description ? description.length : ""}
                {!isDescriptionSeoFriendly(description) ? (
                  <>
                    {description &&
                    description.length > recommendedDescriptionLength.max ? (
                      <ToolTipComponent text="Description character is greater than Recommended limit">
                        <TicketX className="inline-block text-red-500 ml-1" />
                      </ToolTipComponent>
                    ) : (
                      <ToolTipComponent text="Description character is less than Recommended limit">
                        <TicketX className="inline-block text-red-500 ml-1" />
                      </ToolTipComponent>
                    )}
                  </>
                ) : (
                  <ToolTipComponent text="Title is SEO friendly">
                    <TicketCheck className="inline-block text-green-500 ml-1" />
                  </ToolTipComponent>
                )}
              </p>
            </div>
            <div>
              {/* <Button onClick={form.handleSubmit(handleGenerate)} className="my-6">
                    Generate Meta Data
                  </Button> */}
              {result && (
                <div>
                  <h3 className="text-lg font-semibold">Generated Content</h3>
                  <p className="text-muted-foreground">{result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
