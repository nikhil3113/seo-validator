import React from "react";
import {
  isDescriptionSeoFriendly,
  isKeywordDescriptionOptimal,
  isKeywordTitleOptimal,
  isTitleSeoFriendly,
  SEO_LIMITS,
} from "../lib/helper";

import ToolTipComponent from "./ToolTipComponent";
import { Keyboard, TicketCheck, TicketX } from "lucide-react";
import { Button } from "./ui/button";

interface OnePageResultProps {
  title: string;
  description: string;
  result?: string;
  setTitle?: (title: string) => void;
  setDescription?: (description: string) => void;
  keyword?: string | undefined;
  setKeyword?: (keyword: string) => void;
  showForm?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleGenerate?: (values: any) => Promise<void>;
  aiContentLoading?: boolean;
}

export default function OnePageResult({
  title,
  description,
  result,
  setTitle,
  setDescription,
  keyword,
  showForm = false,
  handleGenerate,
  aiContentLoading,
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
                    placeholder="Enter Title"
                    onChange={(e) => setTitle && setTitle(e.target.value)}
                    className="w-full p-2 rounded-lg border"
                  />
                ) : (
                  "No title found"
                )}
              </p>
              <div className="flex gap-2 items-center w-full">
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
                {keyword ? (
                  !isKeywordTitleOptimal(title, keyword) ? (
                    <>
                      <ToolTipComponent text="Recommended to add  1 - 2 keywords in title">
                        <Keyboard className="inline-block text-red-500 ml-1 " />
                      </ToolTipComponent>
                    </>
                  ) : (
                    <ToolTipComponent text="Keyword is optimal in title">
                      <Keyboard className="inline-block text-green-500 ml-1" />
                    </ToolTipComponent>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {description || showForm ? (
                  <textarea
                    value={description}
                    placeholder="Enter Description"
                    onChange={(e) =>
                      setDescription && setDescription(e.target.value)
                    }
                    className="w-full p-2 rounded-lg border"
                  />
                ) : (
                  "No description found"
                )}
              </p>
              <div className="flex gap-2 items-center">
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
                  <ToolTipComponent text="Description is SEO friendly">
                    <TicketCheck className="inline-block text-green-500 ml-1" />
                  </ToolTipComponent>
                )}
                {keyword ? (
                  !isKeywordDescriptionOptimal(description, keyword) ? (
                    <>
                      <ToolTipComponent text="Recommended to add  1 - 3 keywords in Description">
                        <Keyboard className="inline-block text-red-500 ml-1 " />
                      </ToolTipComponent>
                    </>
                  ) : (
                    <ToolTipComponent text="Keyword is optimal in Description">
                      <Keyboard className="inline-block text-green-500 ml-1" />
                    </ToolTipComponent>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <Button
                onClick={handleGenerate}
                disabled={aiContentLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                {aiContentLoading ? "Generating..." : " Generate Meta Data"}
              </Button>

              {result && (
                <div className="p-4 bg-gray-100 border rounded-lg space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">
                    Generated Content
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold text-gray-700">
                        Title:
                      </span>
                    </p>
                    <p className="text-gray-900">
                      {result
                        .split("**Description:**")[0]
                        .replace("**Title:**", "")
                        .trim()}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Description:
                      </span>
                    </p>
                    <p className="text-gray-900">
                      {result.split("**Description:**")[1]?.trim()}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    The above content is AI generated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
