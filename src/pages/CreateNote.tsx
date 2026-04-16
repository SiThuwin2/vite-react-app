import { useEffect, useRef } from "react";
import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router";
import { saveNote } from "../utils/storage";

export const createNoteAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  saveNote({ title, content });
  return redirect("/");
};

function CreateNote() {

    const navigate = useNavigate();

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <div>

        <button onClick={() => navigate("/")} className="text-sm text-zinc-500 hover:underline dark:text-zinc-400">
        &larr; Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-6">Create new Note</h2>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            ref={titleInputRef}
            name="title"
            required
            className="w-full p-2 border rounded-md dark:bg-zinc-900 dark:border-zinc-800"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            name="content"
            rows={5}
            required
            className="w-full p-2 border rounded-md dark:bg-zinc-900 dark:border-zinc-800"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md font-medium"
        >
          Save Note
        </button>
      </Form>
    </div>
  );
}

export default CreateNote;
