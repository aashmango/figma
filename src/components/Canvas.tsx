import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const EDIT_PASSWORD = process.env.NEXT_PUBLIC_EDIT_PASSWORD; // Ensure this is set in .env.local

interface Block {
    id: string;
    type: 'image' | 'text' | 'video';
    content: string;
    position_x: number;
    position_y: number;
    width: number;
    height: number;
}

function Canvas() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [password, setPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const toggleEditMode = () => {
        if (isEditMode) {
            setIsEditMode(false);
        } else {
            setShowPasswordModal(true);
        }
    };

    const handlePasswordSubmit = () => {
        if (password === EDIT_PASSWORD) {
            setIsEditMode(true);
            setShowPasswordModal(false);
        } else {
            alert('Incorrect password');
        }
    };

    const addBlock = (type: 'image' | 'text' | 'video') => {
        const newBlock = {
            id: Date.now().toString(), // Generate a unique ID
            type,
            content: '', // Set default content
            position_x: 0, // Set default position
            position_y: 0,
            width: 100, // Set default width
            height: 100, // Set default height
        };
        setBlocks([...blocks, newBlock]); // Update the state with the new block
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(block => block.id !== id)); // Remove the block with the specified id
    };

    return (
        <div>
            <button onClick={toggleEditMode}>{isEditMode ? 'View Mode' : 'Edit Mode'}</button>
            {showPasswordModal && (
                <div>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handlePasswordSubmit}>Submit</button>
                </div>
            )}
            <div className="canvas">
                {blocks.map(block => (
                    <Block key={block.id} block={block} isEditMode={isEditMode} removeBlock={removeBlock} />
                ))}
            </div>
        </div>
    );
}

export default Canvas;
