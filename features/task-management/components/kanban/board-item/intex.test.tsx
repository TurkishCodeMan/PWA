import { render, screen } from "@testing-library/react";
import { BoardItem, TaskWithUsers } from "./";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { act } from "react-dom/test-utils";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const queryClient = new QueryClient();

// TDD TEST DRIVEN DEVELOPMENT

test("board item move to test", async () => {
  const users = [
    {
      id: "1",
      name: "john doe",
    },
    {
      id: "2",
      name: "jane doe",
    },
  ];
  const item = {
    id: "1",
    name: "a",
    address: {
      address: "123 Main St",
      zipCode: "12345",
    },

    users,
  };

  const index = 0;
  const isLoadingTaskGroup = false;
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DragDropContext
          onDragStart={() => {}}
          onDragUpdate={() => {}}
          onDragEnd={() => {}}
        >
          <Droppable droppableId={"1"}>
            {(provided) => (
              <div ref={provided.innerRef}>
                <BoardItem
                  key={item.id}
                  item={item as TaskWithUsers}
                  index={index}
                  boards={[
                    { id: "1", name: "A" },
                    { id: "2", name: "B" },
                  ]}
                  isLoadingTaskGroup={isLoadingTaskGroup}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </QueryClientProvider>
    );
  });

  const popoverButton = screen.getByTestId("three-dot");
  userEvent.click(popoverButton);
  const moveToButton = await screen.findByText(/move to/i);
  userEvent.click(moveToButton);
  const moveToInput = await screen.findByRole("menuitem", {
    name: /B/i,
  });

  
  userEvent.click(moveToInput);
  expect(moveToInput).toBeInTheDocument();
  

  userEvent.click(moveToButton);
  const moveToInputA = await screen.findByRole("menuitem", {
    name: /A/i,
  });

  expect(moveToInputA).toBeInTheDocument();

});
