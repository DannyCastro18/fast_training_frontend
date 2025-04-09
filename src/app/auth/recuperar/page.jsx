'use client';
import { useState } from 'react';
import RecuperarForm from "@/components/auth/RecuperarForm";

export default function RecuperarPage() {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            {showModal && <RecuperarForm onClose={() => setShowModal(false)} />}
        </>
    );
}