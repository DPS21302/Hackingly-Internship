import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React from "react";

export default function ProblemStatmentField() {
  return (
    <>
      <div className="hover:ring-1 focus:ring-[#6956e3] flex gap-3 flex-col border border-gray-300 p-3 rounded-lg shadow-lg">
        <h1 className="text-2xl my-2 font-medium text-primary">
          Problem Statement
        </h1>

        <Input
          type="text"
          label="Problem Code"
          variant="faded"
          color="primary"
          value={currentProblemCode}
          onChange={(e) => setCurrentProblemCode(e.target.value)}
        />
        <div className="mb-4"></div>
        <Input
          type="text"
          label="Problem Title"
          variant="faded"
          color="primary"
          value={currentProblemTitle}
          onChange={(e) => setCurrentProblemTitle(e.target.value)}
        />

        <div className="mt-6 mx-0.5">
          <h1 className="text-xl my-2 font-medium text-primary">Description</h1>
          {/* <ReactQuill
                      value={description}
                      onChange={setDescription}
                      placeholder="Describe your event challenges in brief..."
                      className="h-[200px] mb-10"
                    ></ReactQuill> */}
          {/* <JoditEditor
                      ref={editor}
                      // config={config}
                      value={description}
                      onBlur={handleUpdate}
                      onChange={setDescription}
                    /> */}
        </div>

        <div className="mt-4"></div>
        {/* <Tags tags={tags} setTags={setTags} /> */}

        {/* Link */}
        <div className="mt-4">
          <div className="flex gap-3 flex-col border border-gray-300 p-3 rounded-lg">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-primary">Links</h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Input
                autoFocus
                color="primary"
                variant="faded"
                type="text"
                value={link} // Add the value attribute to link the input to the state
                onChange={(e) => setLink(e.target.value)} // Handle input changes
              />
            </div>
            <Button
              isDisabled={link.trim().length === 0}
              color="primary"
              onClick={handleAddLink}
              className="w-fit"
            >
              Add
            </Button>
            <div>
              {links.length > 0 ? (
                <>
                  {links.map((link, i) => (
                    <Card key={i + 1} className="p-3 border border-gray-300">
                      <CardBody>
                        <h2 className="text-lg font-medium">
                          {link.problemTitle}
                        </h2>
                        <p className="text-base text-gray-600">
                          {link.problemCode}
                        </p>
                        <h2>{link.link}</h2>
                      </CardBody>
                    </Card>
                  ))}
                </>
              ) : (
                <p className="text-danger"> No Link added</p>
              )}
            </div>
          </div>
          <div className="mt-4"></div>

          <div className="mt-4"></div>
          <Button color="primary" onClick={handleAddLink} className="w-fit">
            Add
          </Button>
        </div>
        <div>
          {links.length > 0 ? (
            <>
              {links.map((link, i) => (
                <Card key={i + 1} className="mt-4 p-3 border border-gray-100">
                  <CardBody>
                    <p className="text-base font-semibold text-gray-600">
                      {link.problemCode}
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                      {link.problemTitle}
                    </h2>

                    <p className="text-base mt-2 text-justify text-gray-500">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: link.description,
                        }}
                      />
                    </p>

                    <p className="text-base text-blue-600 mt-3">{link.link}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <p className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        {link.tags}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <p className="text-danger"> No Link added</p>
          )}
        </div>
      </div>
    </>
  );
}
