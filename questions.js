const questionsBank = [
    {
        domain: "Design Agent Architecture",
        question: "You are designing a multi-agent system where a primary agent delegates specific tasks to specialized sub-agents. Which pattern are you implementing?",
        options: [
            "Linear Chaining Pattern",
            "Supervisor (Router) Pattern",
            "Map-Reduce Pattern",
            "Reflection Pattern"
        ],
        answer: 1,
        explanation: "The Supervisor or Router pattern involves a primary agent that evaluates an objective, routes sub-tasks to specialized worker agents, and aggregates their responses to fulfill the initial request."
    },
    {
        domain: "Tooling & MCP Execution",
        question: "What is the primary purpose of the Model Context Protocol (MCP) in agent architecture?",
        options: [
            "To define the neural network weights of the underlying LLM.",
            "To standardize how AI models securely connect to data sources and tools.",
            "To limit the concurrent execution of multiple agents.",
            "To provide a frontend user interface for chat applications."
        ],
        answer: 1,
        explanation: "MCP is an open standard that enables secure, two-way connections between AI models and various data sources or tools, standardizing integration across environments."
    },
    {
        domain: "Tooling & MCP Execution",
        question: "When designing an execution environment for an agent that writes and runs code, which security principle is most critical?",
        options: [
            "High availability",
            "Data replication",
            "Sandboxing and least privilege",
            "Synchronous execution"
        ],
        answer: 2,
        explanation: "Agents executing code must be heavily sandboxed to prevent malicious or unintended system modifications. They should only have the minimum permissions necessary (least privilege) to execute their tasks."
    },
    {
        domain: "Foundations of Agentic Systems",
        question: "Which of the following differentiates an 'Agentic System' from a standard conversational LLM?",
        options: [
            "The ability to parse JSON payloads.",
            "The capacity for autonomous reasoning, planning, and taking actions via tools.",
            "The use of a larger parameter model (e.g., GPT-4 over GPT-3.5).",
            "The ability to generate images from text prompts."
        ],
        answer: 1,
        explanation: "While conversational LLMs predict the next token to generate text, Agentic Systems utilize the LLM as a reasoning engine to create plans, loop through observations, and execute actions using external tools."
    },
    {
        domain: "Design Agent Architecture",
        question: "Your agent needs to maintain context over a long-running process that spans multiple days. Which type of memory implementation is required?",
        options: [
            "In-context learning (Prompt engineering)",
            "Short-term memory (Session context)",
            "Long-term memory (Vector databases / Persistent storage)",
            "Zero-shot prompting"
        ],
        answer: 2,
        explanation: "Long-term memory involves persisting agent interactions and state to external storage (like a vector database or SQL database) so the agent can retrieve historical context across different sessions."
    },
    {
        domain: "Foundations of Agentic Systems",
        question: "In the ReAct (Reasoning and Acting) framework, what is the typical sequence of steps an agent follows?",
        options: [
            "Action -> Observation -> Thought",
            "Thought -> Action -> Observation",
            "Observation -> Action -> Thought",
            "Thought -> Observation -> Action"
        ],
        answer: 1,
        explanation: "The ReAct pattern dictates that an agent first formulates a 'Thought' (reasoning), executes an 'Action' based on that thought, and receives an 'Observation' from the environment, repeating the loop if necessary."
    },
    {
        domain: "Tooling & MCP Execution",
        question: "When exposing an internal API to an agent via a tool definition, why is a highly descriptive docstring or schema critical?",
        options: [
            "It is required by standard REST protocols.",
            "It allows the LLM to understand when and how to accurately use the tool.",
            "It reduces the latency of the API call.",
            "It encrypts the payload sent to the LLM."
        ],
        answer: 1,
        explanation: "LLMs rely entirely on the provided text descriptions (schemas/docstrings) to understand what a tool does, what parameters it requires, and when it is appropriate to invoke it during a reasoning step."
    }
];
