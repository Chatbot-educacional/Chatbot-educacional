import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

// CSS
import styles  from './CreateExample.module.css'

const CreateExample = () => {
    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [correctExample, setCorrectExample] = useState('')
    const [incorrectExample, setIncorrectExample] = useState('')
    const [errorOptions, setErrorOptions] = useState('')
    const [errorExplanation, setErrorExplanation] = useState('')
    const [formError, setFormError] = useState('')

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("examples-content");

    const [isInserting, setIsInserting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()  
        setFormError('')
        setIsInserting(true);

        await insertDocument({
            title,
            topic,
            difficulty,
            problemDescription,
            correctExample,
            incorrectExample,
            errorOptions,
            errorExplanation,
            uid: user.uid,
            createdBy: user.displayName,
        })

        setIsInserting(false);

        // redirect to home page
    }

    return (
        <div className={styles.createExample}>
            <h2>Criar exemplo</h2>
            <p>Registre um novo exemplo de ensino de programação</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder='Digite o título do exemplo...'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </label>
                <label>
                    <span>Tópico:</span>
                    <input 
                    type="text" 
                    name='topic' 
                    required 
                    placeholder='Digite o tópico do exemplo...'
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                    />
                </label>
                <label>
                <span>Dificuldade:</span>
                    <input 
                        type="checkbox" 
                        name="difficulty" 
                        value="easy" 
                        onChange={(e) => setDifficulty(e.target.value)}
                        checked={difficulty === 'easy'}
                    />
                    <span>Fácil</span>

                    <input 
                        type="checkbox" 
                        name="difficulty" 
                        value="medium" 
                        onChange={(e) => setDifficulty(e.target.value)}
                        checked={difficulty === 'medium'}
                    />
                    <span>Médio</span>

                    <input 
                        type="checkbox" 
                        name="difficulty" 
                        value="hard" 
                        onChange={(e) => setDifficulty(e.target.value)}
                        checked={difficulty === 'hard'}
                    />
                    <span>Difícil</span>
                </label>
                <label>
                    <span>Descrição do problema:</span>
                    <input 
                    type="text" 
                    name='problemDescription' 
                    required 
                    placeholder='Digite a descrição do problema do exemplo...'
                    onChange={(e) => setProblemDescription(e.target.value)}
                    value={problemDescription}
                    />
                </label>
                <label>
                    <span>Exemplo correto:</span>
                    <input 
                    type="text" 
                    name='correctExample' 
                    required 
                    placeholder='Digite o exemplo correto...'
                    onChange={(e) => setCorrectExample(e.target.value)}
                    value={correctExample}
                    />
                </label>
                <label>
                    <span>Exemplo incorreto:</span>
                    <input 
                    type="text" 
                    name='incorrectExample' 
                    required 
                    placeholder='Digite o título do exemplo...'
                    onChange={(e) => setIncorrectExample(e.target.value)}
                    value={incorrectExample}
                    />
                </label>
                <label>
                    <span>Opções de Erro</span>
                    <input 
                    type="text" 
                    name='errorOptions' 
                    required 
                    placeholder='Digite as opções de erro...'
                    onChange={(e) => setErrorOptions(e.target.value)}
                    value={errorOptions}
                    />
                </label>
                <label>
                    <span>Explicação do erro</span>
                    <input 
                    type="text" 
                    name='errorExplanation' 
                    required 
                    placeholder='Digite a explicação da solução do erro...'
                    onChange={(e) => setErrorExplanation(e.target.value)}
                    value={errorExplanation}
                    />
                </label>
                {!isInserting && <button className="btn">Registrar</button>}
                {isInserting && <button className="btn" disabled>Registrando...</button>}
                {response.error && <p className="error">{response.error}</p>}
            </form>
        </div>
    )
}

export default CreateExample;
