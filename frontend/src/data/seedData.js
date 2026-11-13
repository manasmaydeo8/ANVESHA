// src/data/seedData.js
/**
 * 10 hand-written languages with 3 field notes and 2 guidelines each.
 * Authored by the seeded curator account.
 */

export const CURATOR_USER = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Field Guide Curator",
  email: "curator@fieldguide.dev",
  initials: "FC",
  created_at: "2024-01-01T00:00:00Z",
};

export const SEED_LANGUAGES = [
  {
    id: "lang-python-001",
    slug: "python",
    name: "Python",
    tagline:
      "Clear, readable syntax prioritizing programmer velocity and expressiveness.",
    overview:
      "Conceived in the late 1980s by Guido van Rossum at CWI in the Netherlands, Python emphasizes developer ergonomics and code clarity. Its significant whitespace, batteries-included standard library, and massive ecosystem make it the lingua franca for data science, scripting, and web backends.",
    year: 1991,
    designer: "Guido van Rossum",
    paradigms: ["multi-paradigm", "object-oriented", "functional", "scripting"],
    typing: "dynamic, strong",
    execution: "interpreted / bytecode VM",
    hello_world:
      'def main():\n    print("Hello, field guide!")\n\nif __name__ == "__main__":\n    main()',
    specimen_no: 1,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-01T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-javascript-002",
    slug: "javascript",
    name: "JavaScript",
    tagline:
      "The ubiquitous runtime of the web, prototype-based and event-driven.",
    overview:
      "Written in 10 days by Brendan Eich in 1995 for Netscape Navigator, JavaScript was originally mocked but evolved into the most deployed runtime on earth. With event loops, first-class functions, and modern JIT runtimes like V8, it powers both web clients and servers.",
    year: 1995,
    designer: "Brendan Eich",
    paradigms: ["event-driven", "functional", "imperative", "scripting"],
    typing: "dynamic, weak",
    execution: "JIT-compiled",
    hello_world:
      'function main() {\n  console.log("Hello, field guide!");\n}\n\nmain();',
    specimen_no: 2,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-02T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-typescript-003",
    slug: "typescript",
    name: "TypeScript",
    tagline: "Typed JavaScript at any scale with structural type inference.",
    overview:
      "Designed by Anders Hejlsberg at Microsoft in 2012, TypeScript adds static type definitions to JavaScript. Its structural type system models real-world JS idioms with remarkable fidelity, erasing to clean JavaScript at compile time.",
    year: 2012,
    designer: "Anders Hejlsberg",
    paradigms: ["functional", "object-oriented", "declarative"],
    typing: "static, structural, gradual",
    execution: "transpiled to JS",
    hello_world:
      'interface Greeting {\n  message: string;\n}\n\nconst greet = (g: Greeting): void => {\n  console.log(g.message);\n};\n\ngreet({ message: "Hello, field guide!" });',
    specimen_no: 3,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-03T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-rust-004",
    slug: "rust",
    name: "Rust",
    tagline:
      "Memory safety without garbage collection via compile-time borrow checking.",
    overview:
      "Spawned as a personal project by Graydon Hoare and sponsored by Mozilla, Rust guarantees memory safety and concurrency safety at compile time using an affine type system and ownership semantics. It has replaced C and C++ in high-assurance infrastructure across major operating systems.",
    year: 2015,
    designer: "Graydon Hoare",
    paradigms: ["systems", "functional", "imperative", "concurrent"],
    typing: "static, strong, affine",
    execution: "AOT compiled (LLVM)",
    hello_world:
      'fn main() {\n    let message = "Hello, field guide!";\n    println!("{}", message);\n}',
    specimen_no: 4,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-04T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-go-005",
    slug: "go",
    name: "Go",
    tagline:
      "Simple, concurrent, and pragmatic systems programming with fast compilation.",
    overview:
      "Created at Google by Robert Griesemer, Rob Pike, and Ken Thompson to combat bloated C++ build times and distributed systems complexity. Go features CSP-style concurrency (goroutines and channels), structural typing with interfaces, and intentionally Spartan syntax.",
    year: 2009,
    designer: "Robert Griesemer, Rob Pike, Ken Thompson",
    paradigms: ["concurrent", "imperative", "systems"],
    typing: "static, strong",
    execution: "compiled (native machine code)",
    hello_world:
      'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, field guide!")\n}',
    specimen_no: 5,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-05T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-c-006",
    slug: "c",
    name: "C",
    tagline:
      "The foundation of modern computing and minimal abstract machine over memory.",
    overview:
      "Developed between 1969 and 1973 by Dennis Ritchie at Bell Labs to implement the Unix kernel. C exposes raw memory pointers, manual allocation, and direct processor mapping, making it the bedrock language of operating systems, runtimes, and embedded devices.",
    year: 1972,
    designer: "Dennis Ritchie",
    paradigms: ["procedural", "imperative", "systems"],
    typing: "static, weak",
    execution: "compiled to machine code",
    hello_world:
      '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, field guide!\\n");\n    return 0;\n}',
    specimen_no: 6,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-06T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-haskell-007",
    slug: "haskell",
    name: "Haskell",
    tagline:
      "Purely functional, non-strict evaluation with advanced Hindley-Milner types.",
    overview:
      "Formed by committee in 1990 to unite research on non-strict purely functional programming. Haskell guarantees referential transparency by isolating side-effects in monads. Its typeclasses, laziness, and algebraic data types inspired generations of modern languages.",
    year: 1990,
    designer: "Lennart Augustsson, Dave Barton, et al.",
    paradigms: ["functional", "declarative"],
    typing: "static, strong, inferred (HM)",
    execution: "compiled (GHC) / bytecode VM",
    hello_world:
      'module Main where\n\nmain :: IO ()\nmain = putStrLn "Hello, field guide!"',
    specimen_no: 7,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-07T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-ruby-008",
    slug: "ruby",
    name: "Ruby",
    tagline:
      "Designed for programmer joy, natural fluency, and extreme metaprogramming.",
    overview:
      "Created in 1995 by Yukihiro 'Matz' Matsumoto in Japan, combining aspects of Perl, Smalltalk, Eiffel, and Lisp. Ruby treats everything as an object and prioritizes developer happiness, powering thousands of high-impact products via Ruby on Rails.",
    year: 1995,
    designer: "Yukihiro Matsumoto",
    paradigms: ["object-oriented", "imperative", "functional", "scripting"],
    typing: "dynamic, strong (duck-typed)",
    execution: "interpreted (YARV)",
    hello_world:
      'def greet(target)\n  puts "Hello, #{target}!"\nend\n\ngreet("field guide")',
    specimen_no: 8,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-08T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-elixir-009",
    slug: "elixir",
    name: "Elixir",
    tagline:
      "Fault-tolerant, high-concurrency functional programming on the Erlang BEAM.",
    overview:
      "Created in 2012 by José Valim to bring modern syntax and macro metaprogramming to the battle-tested Erlang BEAM virtual machine. Elixir applications use lightweight actors to handle millions of simultaneous network connections with self-healing supervisor trees.",
    year: 2012,
    designer: "José Valim",
    paradigms: ["functional", "concurrent", "distributed"],
    typing: "dynamic, strong",
    execution: "BEAM bytecode",
    hello_world:
      'defmodule Guide do\n  def hello do\n    IO.puts("Hello, field guide!")\n  end\nend\n\nGuide.hello()',
    specimen_no: 9,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-09T00:00:00Z",
    seeded: true,
  },
  {
    id: "lang-zig-010",
    slug: "zig",
    name: "Zig",
    tagline:
      "Robust, optimal, and clear systems programming with comptime metaprogramming.",
    overview:
      "Created in 2016 by Andrew Kelley as a modern alternative to C. Zig rejects hidden control flow, preprocessor macros, and hidden memory allocations, replacing them with first-class compile-time execution (`comptime`) and explicit memory allocators.",
    year: 2016,
    designer: "Andrew Kelley",
    paradigms: ["systems", "imperative"],
    typing: "static, strong",
    execution: "compiled (native LLVM / self-hosted)",
    hello_world:
      'const std = @import("std");\n\npub fn main() !void {\n    const stdout = std.io.getStdOut().writer();\n    try stdout.print("Hello, {s}!\\n", .{"field guide"});\n}',
    specimen_no: 10,
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-10T00:00:00Z",
    seeded: true,
  },
];

export const SEED_FACTS = [
  // Python
  {
    id: "f-py-1",
    language_id: "lang-python-001",
    text: "Python is named after Monty Python's Flying Circus, not the snake. The documentation historically featured references to spam, eggs, and dead parrots.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-01T01:00:00Z",
  },
  {
    id: "f-py-2",
    language_id: "lang-python-001",
    text: "Typing `import this` in a Python terminal prints The Zen of Python, 19 aphorisms written by Tim Peters that guide language design.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-01T02:00:00Z",
  },
  {
    id: "f-py-3",
    language_id: "lang-python-001",
    text: "Python's Timsort algorithm was invented in 2002 by Tim Peters and proved so efficient it was later adopted by Java and Android.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-01T03:00:00Z",
  },

  // JavaScript
  {
    id: "f-js-1",
    language_id: "lang-javascript-002",
    text: "The language was originally codenamed Mocha, renamed LiveScript, and finally named JavaScript as a marketing agreement between Netscape and Sun Microsystems.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-02T01:00:00Z",
  },
  {
    id: "f-js-2",
    language_id: "lang-javascript-002",
    text: "`typeof null === 'object'` is an acknowledged 30-year-old bug caused by 000 type tag encoding in Netscape's original C representation.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-02T02:00:00Z",
  },
  {
    id: "f-js-3",
    language_id: "lang-javascript-002",
    text: "JavaScript has two zeros: `+0` and `-0`, conforming to IEEE-754 floating point arithmetic; `Object.is(+0, -0)` returns `false`.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-02T03:00:00Z",
  },

  // TypeScript
  {
    id: "f-ts-1",
    language_id: "lang-typescript-003",
    text: "TypeScript's type system is Turing complete; users have implemented SQL engines, chess, and floating point math entirely within the type system.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-03T01:00:00Z",
  },
  {
    id: "f-ts-2",
    language_id: "lang-typescript-003",
    text: "Anders Hejlsberg is also the original lead architect of Turbo Pascal, Delphi, and C#, making TypeScript his fourth landmark compiler.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-03T02:00:00Z",
  },
  {
    id: "f-ts-3",
    language_id: "lang-typescript-003",
    text: "TypeScript emits no runtime metadata by default and erases all types during compilation, ensuring zero runtime overhead.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-03T03:00:00Z",
  },

  // Rust
  {
    id: "f-rs-1",
    language_id: "lang-rust-004",
    text: "Rust was named after rust fungi (Pucciniales), known for their resilience and survival under extreme biological conditions.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-04T01:00:00Z",
  },
  {
    id: "f-rs-2",
    language_id: "lang-rust-004",
    text: "The earliest version of Rust (2006-2010) featured garbage collection and green threads, which were both removed before 1.0 to achieve true zero-cost abstractions.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-04T02:00:00Z",
  },
  {
    id: "f-rs-3",
    language_id: "lang-rust-004",
    text: "The Rust borrow checker guarantees that data races between threads are impossible without explicitly invoking `unsafe`.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-04T03:00:00Z",
  },

  // Go
  {
    id: "f-go-1",
    language_id: "lang-go-005",
    text: "Go's mascot is Gordon the Gopher, designed by Renée French, who also created Glenda the Plan 9 Bunny.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-05T01:00:00Z",
  },
  {
    id: "f-go-2",
    language_id: "lang-go-005",
    text: "Go goroutines start with an initial stack allocation of just 2KB, dynamically resizing as needed so servers can comfortably run hundreds of thousands of concurrent routines.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-05T02:00:00Z",
  },
  {
    id: "f-go-3",
    language_id: "lang-go-005",
    text: "Ken Thompson, co-designer of Go, was also the co-creator of Unix, B (predecessor of C), and the UTF-8 text encoding scheme.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-05T03:00:00Z",
  },

  // C
  {
    id: "f-c-1",
    language_id: "lang-c-006",
    text: "Dennis Ritchie developed C alongside Ken Thompson to rewrite Unix from PDP-11 assembly into a portable compiled language.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-06T01:00:00Z",
  },
  {
    id: "f-c-2",
    language_id: "lang-c-006",
    text: "The classic 'Hello, World!' program first appeared in Brian Kernighan's 1974 internal Bell Labs tutorial 'Programming in C: A Tutorial'.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-06T02:00:00Z",
  },
  {
    id: "f-c-3",
    language_id: "lang-c-006",
    text: "C has no boolean primitive type in its original C89 specification; 0 represented false and any non-zero integer represented true.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-06T03:00:00Z",
  },

  // Haskell
  {
    id: "f-hs-1",
    language_id: "lang-haskell-007",
    text: "Named after logician Haskell Curry, whose mathematical work founded combinatory logic and type theory.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-07T01:00:00Z",
  },
  {
    id: "f-hs-2",
    language_id: "lang-haskell-007",
    text: "Haskell features non-strict lazy evaluation: expressions are represented as thunks and evaluated only when their values are strictly demanded by I/O.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-07T02:00:00Z",
  },
  {
    id: "f-hs-3",
    language_id: "lang-haskell-007",
    text: "Philip Wadler introduced Monads to functional programming in 1992, drawing on Eugenio Moggi's category-theoretical structures to model side effects elegantly.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-07T03:00:00Z",
  },

  // Ruby
  {
    id: "f-rb-1",
    language_id: "lang-ruby-008",
    text: "Matz named the language Ruby because it was the birthstone of one of his colleagues, following the gemstone naming tradition of Perl.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-08T01:00:00Z",
  },
  {
    id: "f-rb-2",
    language_id: "lang-ruby-008",
    text: 'In Ruby, numbers and nil are first-class objects; you can call methods directly on integers, like `5.times { puts "hello" }`.',
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-08T02:00:00Z",
  },
  {
    id: "f-rb-3",
    language_id: "lang-ruby-008",
    text: 'The phrase MINASWAN ("Matz Is Nice And So We Are Nice") became the cultural governing ethos of the early Ruby developer community.',
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-08T03:00:00Z",
  },

  // Elixir
  {
    id: "f-ex-1",
    language_id: "lang-elixir-009",
    text: "José Valim began creating Elixir while trying to improve concurrency performance in Rails when multicore CPUs became standard.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-09T01:00:00Z",
  },
  {
    id: "f-ex-2",
    language_id: "lang-elixir-009",
    text: "The BEAM virtual machine was engineered by Ericsson in the 1980s to run telephone switches with nine nines (99.9999999%) uptime.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-09T02:00:00Z",
  },
  {
    id: "f-ex-3",
    language_id: "lang-elixir-009",
    text: "Elixir uses the pipeline operator `|>` to pass the result of one function as the first argument to another, turning nested calls into clear step pipelines.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-09T03:00:00Z",
  },

  // Zig
  {
    id: "f-zg-1",
    language_id: "lang-zig-010",
    text: "Zig can cross-compile C and C++ out of the box for any target architecture without external dependencies via `zig cc`.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-10T01:00:00Z",
  },
  {
    id: "f-zg-2",
    language_id: "lang-zig-010",
    text: "Zig has no preprocessor macros or templates; compile-time logic is executed using normal Zig code marked with the `comptime` keyword.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-10T02:00:00Z",
  },
  {
    id: "f-zg-3",
    language_id: "lang-zig-010",
    text: "Memory allocation in Zig is never hidden; standard library functions take an explicit `Allocator` argument so callers control allocation strategy.",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-10T03:00:00Z",
  },
];

export const SEED_GUIDELINES = [
  // Python
  {
    id: "g-py-1",
    language_id: "lang-python-001",
    title: "Use list and dict comprehensions over manual loop accumulation",
    body: "Comprehensions are not only more concise and idiomatic; they run at C-speed inside the CPython bytecode interpreter compared to repeated method lookups in manual append loops.",
    when_to_use:
      "Transforming or filtering one iterable into another with straightforward predicates.",
    avoid:
      "Avoid nesting more than two loops or logic with complex side effects inside a comprehension.",
    category: "Idioms",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-01T04:00:00Z",
  },
  {
    id: "g-py-2",
    language_id: "lang-python-001",
    title: "Adopt type hints and mypy/pyright for codebase resilience",
    body: "While Python is dynamically typed at runtime, modern typing (PEP 484/585) documents function contracts, powers IDE autocomplete, and catches subtle bugs before execution.",
    when_to_use:
      "Public API boundaries, shared libraries, and growing application teams.",
    avoid:
      "Over-constraining scratch scripts or adding complicated type acrobatics where duck typing suffices.",
    category: "Practices",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-01T05:00:00Z",
  },

  // JavaScript
  {
    id: "g-js-1",
    language_id: "lang-javascript-002",
    title: "Prefer structured async/await over raw promise chains",
    body: "Async/await unwinds stack traces naturally, works seamlessly with try/catch/finally blocks, and avoids unhandled promise rejection pitfalls.",
    when_to_use:
      "Serial and structured asynchronous operations, error boundary handling.",
    avoid:
      "Avoid awaiting in sequential loops when operations can run concurrently with `Promise.all`.",
    category: "Concurrency",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-02T04:00:00Z",
  },
  {
    id: "g-js-2",
    language_id: "lang-javascript-002",
    title: "Always enforce strict equality `===` over loose `==`",
    body: 'Loose equality invokes complex implicit coercion tables that produce surprising bugs (e.g. `"" == 0` is true). Strict equality avoids coercion entirely.',
    when_to_use: "All equality comparisons without exception.",
    avoid:
      "Avoid relying on loose equality even for null/undefined checks unless explicitly intentional.",
    category: "Safety",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-02T05:00:00Z",
  },

  // TypeScript
  {
    id: "g-ts-1",
    language_id: "lang-typescript-003",
    title: "Leverage discriminated unions for state modeling",
    body: 'Define states with a shared discriminator literal property (e.g., `kind: "loading" | "success" | "error"`). The compiler enforces exhaustive branching in switch statements.',
    when_to_use:
      "API response envelopes, state machine transitions, event dispatchers.",
    avoid:
      "Avoid optional-property amalgamations where valid combinations of state are ambiguous.",
    category: "Type Design",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-03T04:00:00Z",
  },
  {
    id: "g-ts-2",
    language_id: "lang-typescript-003",
    title: "Ban `any`; use `unknown` with narrow type guards",
    body: "Using `any` turns off compiler verification silently downstream. `unknown` forces the developer to check types before accessing properties or calling methods.",
    when_to_use:
      "Parsing untrusted payloads, third-party inputs, and dynamic JSON.",
    avoid:
      "Never cast with `as any` to silence compiler warnings without understanding the underlying type mismatch.",
    category: "Practices",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-03T05:00:00Z",
  },

  // Rust
  {
    id: "g-rs-1",
    language_id: "lang-rust-004",
    title:
      "Pass borrowed references `&str` and `&[T]` to avoid unnecessary allocations",
    body: "Accepting slices instead of owned types (`String` or `Vec<T>`) allows callers to supply owned data, string literals, or slices without cloning memory.",
    when_to_use: "Read-only inspection and querying functions.",
    avoid:
      "Avoid taking `&String` or `&Vec<T>` as function arguments; prefer `&str` and `&[T]`.",
    category: "Memory",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-04T04:00:00Z",
  },
  {
    id: "g-rs-2",
    language_id: "lang-rust-004",
    title: "Propagate errors with `?` and custom error enums",
    body: "Rust treats errors as values (`Result<T, E>`). Use the `?` operator to bubble errors up call stacks rather than reaching for `.unwrap()` or `.expect()` in production code.",
    when_to_use: "All fallible operations in libraries and application logic.",
    avoid:
      "Avoid unwrap in production server paths where unexpected failures could crash worker threads.",
    category: "Error Handling",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-04T05:00:00Z",
  },

  // Go
  {
    id: "g-go-1",
    language_id: "lang-go-005",
    title: "Accept interfaces, return concrete structs",
    body: "Functions should declare interfaces for parameters to maximize flexibility, but return concrete struct types so callers have full visibility of the returned fields.",
    when_to_use: "Public package API design and dependency injection.",
    avoid:
      "Avoid defining broad multi-method interfaces upfront before implementations require them.",
    category: "Architecture",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-05T04:00:00Z",
  },
  {
    id: "g-go-2",
    language_id: "lang-go-005",
    title: "Always check errors immediately and annotate context",
    body: 'Idiomatic Go does not suppress errors. Check `if err != nil` immediately, and use `fmt.Errorf("...: %w", err)` to wrap contextual breadcrumbs.',
    when_to_use: "Every fallible standard library or database call.",
    avoid:
      "Never assign errors to the blank identifier `_` in production paths.",
    category: "Error Handling",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-05T05:00:00Z",
  },

  // C
  {
    id: "g-c-1",
    language_id: "lang-c-006",
    title:
      "Always pair memory allocations and free at matching abstraction levels",
    body: "Ensure every `malloc`, `calloc`, or `realloc` has an explicit owner and an unambiguous `free`. Clear pointers to `NULL` immediately after freeing to prevent use-after-free bugs.",
    when_to_use: "Dynamic heap buffers and resource management.",
    avoid:
      "Avoid transferring ownership across layer boundaries without explicit documentation.",
    category: "Memory",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-06T04:00:00Z",
  },
  {
    id: "g-c-2",
    language_id: "lang-c-006",
    title: "Use fixed-width integers from `<stdint.h>`",
    body: "Platform differences in the width of `int` and `long` cause insidious portability bugs. Use `uint32_t`, `int64_t`, and `size_t` for explicit bit-width guarantees.",
    when_to_use:
      "Data serialization, network protocols, hardware registers, and arithmetic bounds.",
    avoid:
      "Avoid relying on bare `unsigned long` when interacting across 32-bit and 64-bit systems.",
    category: "Portability",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-06T05:00:00Z",
  },

  // Haskell
  {
    id: "g-hs-1",
    language_id: "lang-haskell-007",
    title: "Make illegal states unrepresentable using algebraic data types",
    body: "Construct sum and product types so that invalid configurations cannot be represented at all, eliminating whole classes of defensive checks.",
    when_to_use:
      "Domain modeling, workflow state transitions, parser representations.",
    avoid:
      "Avoid using stringly-typed state tags or boolean flag flags that can be mutually contradictory.",
    category: "Type Design",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-07T04:00:00Z",
  },
  {
    id: "g-hs-2",
    language_id: "lang-haskell-007",
    title:
      "Use strict data fields `!` in persistent records to avoid space leaks",
    body: "Haskell laziness can accumulate thunks in memory over long executions. Marking record fields as strict ensures evaluation upon construction.",
    when_to_use:
      "Long-running daemon states, numeric accumulators, high-throughput caches.",
    avoid:
      "Avoid blind strictness on large recursive structures where on-demand laziness is desired.",
    category: "Performance",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-07T05:00:00Z",
  },

  // Ruby
  {
    id: "g-rb-1",
    language_id: "lang-ruby-008",
    title:
      "Prefer explicit keyword arguments for methods with multiple parameters",
    body: "Positional arguments lead to subtle bugs when parameter counts grow. Keyword arguments make call sites readable and allow default values without order constraints.",
    when_to_use:
      "Methods with three or more parameters, configuration options.",
    avoid:
      "Avoid using bare trailing option hashes; use first-class Ruby keyword arguments.",
    category: "API Design",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-08T04:00:00Z",
  },
  {
    id: "g-rb-2",
    language_id: "lang-ruby-008",
    title: "Leverage Enumerable methods instead of imperative loops",
    body: "Ruby's `Enumerable` module is extraordinarily expressive (`map`, `select`, `reduce`, `group_by`, `flat_map`). Transforming collections functionally produces cleaner, intent-revealing code.",
    when_to_use: "Collection filtering, aggregation, and element mapping.",
    avoid:
      "Avoid mutating external arrays inside `each` when `map` or `select` expresses the transformation.",
    category: "Idioms",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-08T05:00:00Z",
  },

  // Elixir
  {
    id: "g-ex-1",
    language_id: "lang-elixir-009",
    title: "Embrace 'Let It Crash' via supervisor trees",
    body: "Rather than defensively catching every edge-case exception, allow worker processes to crash and let their supervisor restart them from a clean initial state.",
    when_to_use:
      "Managing stateful background processes, socket connections, worker queues.",
    avoid:
      "Avoid masking critical errors with broad `try ... rescue` blocks that leave processes in corrupted states.",
    category: "Reliability",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-09T04:00:00Z",
  },
  {
    id: "g-ex-2",
    language_id: "lang-elixir-009",
    title: "Use pattern matching in function headers rather than branching",
    body: "Define multiple function clauses matching on tuples, maps, or guard clauses (`when is_binary(x)`). This separates control flow cleanly and documents valid inputs.",
    when_to_use:
      "Handling varying message payloads, command inputs, error tuples `{:ok, val}` / `{:error, reason}`.",
    avoid:
      "Deep nested `case` or `cond` statements within a single monolithic function body.",
    category: "Idioms",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-09T05:00:00Z",
  },

  // Zig
  {
    id: "g-zg-1",
    language_id: "lang-zig-010",
    title: "Use `defer` and `errdefer` for deterministic cleanup",
    body: "Declare resource deallocation immediately after allocation using `defer`. Use `errdefer` to clean up partially constructed resources only when an error occurs.",
    when_to_use:
      "Freeing memory buffers, closing file descriptors, unlocking mutexes.",
    avoid:
      "Avoid scattering cleanup logic at multiple return sites throughout a function.",
    category: "Resource Management",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-10T04:00:00Z",
  },
  {
    id: "g-zg-2",
    language_id: "lang-zig-010",
    title: "Choose the optimal Allocator for each lifecycle",
    body: "Zig lets you choose between `GeneralPurposeAllocator`, `ArenaAllocator`, `FixedBufferAllocator`, and test allocators with automatic leak detection.",
    when_to_use:
      "Select `ArenaAllocator` for request lifecycles where all memory can be freed simultaneously.",
    avoid:
      "Avoid hardcoding global allocators into library functions; accept `allocator: std.mem.Allocator` as a parameter.",
    category: "Memory",
    votes: [],
    author: "Field Guide Curator",
    created_by: "00000000-0000-0000-0000-000000000001",
    created_at: "2024-01-10T05:00:00Z",
  },
];
