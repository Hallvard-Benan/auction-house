import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import Tags from "./tags";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "A title is required, and must be at least 2 characters.",
  }),
  tags: z.array().min(1, {
    message: "a tag is required",
  }),
});

export default function CreateListingForm() {
  const [tags, setTags] = useState([]);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data) {
    console.log(data);
  }

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input placeholder="Title of the listing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the listing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Tags tags={tags} onTagsChange={handleTagsChange}></Tags>
        <FormField
          control={form.control}
          name="tags"
          value={tags}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormMessage {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// import { Input } from "../ui/input";
// import Tags from "./tags";
// import { Button } from "../ui/button";

// export default function CreateListingForm() {
//   return (
//     <form action="">
//       <Input></Input>
//       <Tags></Tags>
//       <Button type="submit"></Button>
//     </form>
//   );
// }
