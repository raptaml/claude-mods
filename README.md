# claude-mods

Mods für die Claude Code CLI.

## usage-bars

Zeigt unten in der Statuszeile drei Balken:

```
Ctx ████░░░░░░ 38%  │  5h ██░░░░░░░░ 22% (3h12)  │  Woche █░░░░░░░░░ 9% (4d6h)
```

- **Ctx**: Füllung des Kontextfensters
- **5h**: 5-Stunden-Limit, in Klammern die Zeit bis zum Reset
- **Woche**: 7-Tage-Limit, in Klammern die Zeit bis zum Reset

Die Limit-Balken gibt es nur mit einem Claude-Abo (Pro/Max). Vor der ersten Antwort einer Sitzung zeigen die Balken `··········  –`.

### Installation

Im Prompt einer Claude-Code-Sitzung im Terminal:

```
/plugin install usage-bars --marketplace raptaml/claude-mods
```

Danach `y` zum Hinzufügen des Marketplace und mit Enter den Scope „user“ wählen.

Aus der Shell:

```
claude plugin install usage-bars --marketplace raptaml/claude-mods
```

In der Desktop-App: auf + neben dem Eingabefeld klicken, dann Plugins, Add marketplace mit `raptaml/claude-mods`, dann Add plugin.

Die Balkenbreite steht in `usage-bars/hooks/register.ts` (`WIDTH`).
