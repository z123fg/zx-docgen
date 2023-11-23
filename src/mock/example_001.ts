export type ContentType =
    | "para1"
    | "para2"
    | "body"
    | "abstract"
    | "summarize"
    | "intro"
    | "analysis";

export interface Command {
    cmd_name: string;
    // command name to run the command
    show_name: string; // command name to be shown to the user
    args_name: string[];
    description: string; // the description of the command to be shown to the user
    is_coro: boolean; // if the command is a coroutine
    is_gen: boolean; // if the command is a generator
}
export interface ContentItem {
    type: ContentType;
    text: string;
}

export interface RenderTree {
    ID: string;
    depth: number;
    bullet_point: string;
    locked: boolean;
    children: RenderTree[];
    cmd: Command[];
    content: ContentItem[];
}

export const data: RenderTree = {
    ID: "0", // block ID
    depth: 0, // block depth in the tree
    children: [
        {
            // child block ID
            ID: "1",
            depth: 1,
            children: [],
            bullet_point: "BLOCK 2 TITLE", // text to be shown in the oulline panel
            content: [
                // list of key, value pair to be shown in the preview panel
                {
                    type: "para1",
                    // key could be arbitrary str and could be omitted in the preview panel
                    text: "block 2 first paragraph text...\n\n",
                },
                {
                    type: "para2",
                    // value should be a piece of markdown str, include latex.
                    text: "block 2 second paragraph text...\n\n",
                },
            ],
            cmd: [
                // supported commands by block 1
                {
                    cmd_name: "foo_cmd",
                    // command name to run the command
                    show_name: "FOO Command", // command name to be shown to the user
                    args_name: [
                        // argument names to be shown to the user
                        "name of arg 1",
                        "name of arg 2",
                    ],
                    description: "the description of command foo...", // the description of the command to be shown to the user
                    is_coro: false, // if the command is a coroutine
                    is_gen: false, // if the command is a generator
                },
            ],
            locked: false, // if the block is locked due to other command is running. if the block is locked, user should not able to run any command of the block.
        },
        {
            ID: "2",
            depth: 1,
            children: [
                {
                    ID: "3",
                    depth: 2,
                    children: [],
                    bullet_point: "BLOCK 4 TITLE",
                    content: [
                        {
                            type: "body",
                            text: "some text of block body...\n\n",
                        },
                    ],
                    cmd: [
                        {
                            cmd_name: "foo_cmd",
                            show_name: "FOO Command",
                            args_name: ["name of arg 1", "name of arg 2"],
                            description: "the description of command foo...",
                            is_coro: false,
                            is_gen: false,
                        },
                    ],
                    locked: false,
                },
            ],
            bullet_point: "BLOCK 3 TITLE",
            content: [
                {
                    type: "analysis",
                    text: "block 3 analysis piece of text...\n\n",
                },
            ],
            cmd: [
                {
                    cmd_name: "bar_cmd",
                    show_name: "BAR Command",
                    args_name: ["name of arg 1"],
                    description: "the description of command bar...",
                    is_coro: true,
                    is_gen: false,
                },
            ],
            locked: false,
        },
    ],
    bullet_point: "BLOCK 1 TITLE",
    content: [
        { type: "abstract", text: "block 1 abstraction" },
        {
            type: "intro",
            text: "block 1 introduction text...\n\n",
        },
        {
            type: "summarize",
            text: "block 1 summarization text...\n\n",
        },
    ],
    cmd: [
        {
            cmd_name: "foo_name",
            show_name: "FOO Command",
            args_name: ["name of arg 1", "name of arg 2"],
            description: "the description of command foo...",
            is_coro: false,
            is_gen: false,
        },
        {
            cmd_name: "bar_cmd",
            show_name: "BAR Command",
            args_name: ["name of arg 1"],
            description: "the description of command bar...",
            is_coro: true,
            is_gen: false,
        },
    ],
    locked: false,
};
