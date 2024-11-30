interface BlockProps {
    block: {
        id: string;
        type: 'image' | 'text' | 'video';
        content: string;
        position_x: number;
        position_y: number;
        width: number;
        height: number;
    };
    isEditMode: boolean;
    removeBlock: (id: string) => void;
}

function Block({ block, isEditMode, removeBlock }: BlockProps) {
    return (
        <div style={{ position: 'absolute', left: block.position_x, top: block.position_y, width: block.width, height: block.height }}>
            {block.type === 'image' && <img src={block.content} alt="Block" />}
            {block.type === 'text' && <div dangerouslySetInnerHTML={{ __html: block.content }} />}
            {block.type === 'video' && <video src={block.content} autoPlay muted />}
            {isEditMode && <button onClick={() => removeBlock(block.id)}>Delete</button>}
        </div>
    );
}
