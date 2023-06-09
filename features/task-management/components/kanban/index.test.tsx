import { render, screen } from "@testing-library/react";
import { Kanban } from "./";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { act } from "react-dom/test-utils";
const queryClient = new QueryClient();


  // TDD TEST DRIVEN DEVELOPMENT
  
test("drags and drops kanban component", async () => {
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Kanban />
      </QueryClientProvider>
    );
  });



  //   const draggableItem = screen.getByText(/Task 1/i);
  //   const droppableItem = screen.getByText(/To Do/i);
  //   userEvent.drag(draggableItem);
  //   userEvent.drop(droppableItem);
  //   const updatedDroppableItem = await screen.findByText(/Task 1/i);
  //   expect(updatedDroppableItem).toBeInTheDocument();
});
