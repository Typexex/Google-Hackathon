# Hameleon: Mobile AI Agent IDE

Hameleon is an IDE with directories and compilation in which an AI agent is embedded that can change, create, and do many other things autonomously, like Cursor AI but on Android.

The main technology demonstrated here, Gemini Heavy 0.1, is an agent that combines several Gemini models from 2.0 to 3.0 Pro. It also solves a critical problem - let's say a person doesn't have a PC, but they want to create something, they can write one prompt and create a real full-fledged website.

# Agent Architecture (Gemini Heavy 0.1)
The unique power of Hameleon lies in orchestrating several specialized Gemini models in a 5-stage self-optimizing cycle to guarantee cleanliness and absence of errors in the generated code.

It works approximately like this:
Gemini 2.0 Flash: rapid analysis of the user's task.
Gemini 2.5 Pro and Simultaneously 2.5 Flash: Initial code drafts and ideation.
Gemini 3.0 Pro High: Writes code, used as an Agent.
Gemini 2.5 Pro: Reviews the logic, fixes shortcomings.
Gemini 2.5 Pro: Reviews all the work done by the models, if it finds errors it fixes them, if not, it immediately writes a brief summary of what was done.

# How it works in practice:

The user opens the Hameleon chat and describes the task in natural language (for example: “Create a landing page for a mobile app with a pricing section”).

If the task is complex, Gemini Heavy 0.1 launches a multi-step pipeline consisting of several Gemini models, going through several iterations of analysis, generation, and code refactoring, so the result is cleaner but takes more time.

For simple tasks (small changes, individual components, refactoring), the pipeline uses fewer steps, so the response comes faster. 

# About the repository:
/Generated_WebGL_Project: Generated website created with one prompt through Gemini Heavy 0.1

/Agent_Core_Logic: contains the proprietary file GeminiHeavy_Core_Logic.kt. This file demonstrates the multi-model algorithm on which the IDE is based, without full code disclosure.

Video demonstration of Hameleon IDE (user interface, file structure) and real-time generation process. 
Link: https://youtu.be/RP3VOBRx8HQ?si=_4C6e1Fn-lRqljwc

**Note on Intellectual Property Protection:**
The full source code of the Android application is not disclosed, as Hameleon is an unreleased proprietary IDE from TypexAI. We have provided the necessary logic files and final result to fully demonstrate the advanced capabilities of using the Gemini API.

Developer of Hameleon and Gemini Heavy 0.1, Nikita Resetnjov (14 y/o)

Thank you!

2025, For Google Hackathon.
Also, after the hackathon, the model will be renamed so as not to infringe on Google copyright.
