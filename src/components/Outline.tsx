import React, { MouseEvent, Reducer, useState, useMemo, Fragment } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import {
    TreeItem,
    TreeItemProps,
    treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { RenderTree, data } from "../mock/example_001";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const Outline = () => {
    const [selected, setSelected] = useState<string | null>("");
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const allNodeIds = useMemo<string[]>(() => {
        const result: string[] = [];
        const recurse = (node: RenderTree) => {
            result.push(node.ID);
            node.children.forEach((node) => {
                recurse(node);
            });
        };
        recurse(data);
        return result;
    }, [data]);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };
    const handleExpandAllClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? allNodeIds : []
        );
    };
    const handleSelect = (event: React.SyntheticEvent, nodeIds: string) => {
        setSelected(nodeIds);
    };
    const renderTree = (nodes: RenderTree) => {
        return (
            <StyledTreeItem
                key={nodes.ID}
                nodeId={String(nodes.ID)}
                label={nodes.bullet_point}
                node={nodes}
                handleSelect={handleSelect}
            >
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTree(node))
                    : null}
            </StyledTreeItem>
        );
    };

    return (
        <Box minWidth={"300px"} padding={"10px"}>
            <Typography variant="h6" gutterBottom>
                Outline
            </Typography>
            <Button onClick={handleExpandAllClick}>
                {expanded.length === 0 ? "Expand all" : "Collapse all"}
            </Button>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                selected={selected}
                expanded={expanded}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {renderTree(data)}
            </TreeView>
        </Box>
    );
};

const CustomTreeItem = React.forwardRef(
    (
        props: TreeItemProps & { node: RenderTree } & {
            handleSelect: Function;
        },
        ref: React.Ref<HTMLLIElement>
    ) => {
        const [contextMenu, setContextMenu] = useState<{
            x: number;
            y: number;
        } | null>(null);
        const handleContextMenu = (event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            setContextMenu(
                contextMenu === null
                    ? {
                          x: event.clientX + 2,
                          y: event.clientY - 6,
                      }
                    : null
            );
            props.handleSelect(undefined, props.node.ID);
        };
        const handleClose = (e: any) => {
            setContextMenu(null);
        };
        return (
            <div onContextMenu={handleContextMenu}>
                <TreeItem {...props} ref={ref} />
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? {
                                  top: contextMenu.y,
                                  left: contextMenu.x,
                              }
                            : undefined
                    }
                >
                    {props.node.cmd.map((item) => (
                        <MenuItem onClick={handleClose}>
                            {item.show_name}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
);

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        "& .close": {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 12,
        paddingLeft: 15,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.content}`]: {
        height: "50px",
    },
}));
export default Outline;
