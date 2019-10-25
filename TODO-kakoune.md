## Basic Interaction

# Selections

The main concept in Kakoune is the selection. A selection is an inclusive,
directed range of character. A selection has two ends, the anchor and the
cursor.

There is always at least one selection, and a selection is always at least
one character (in which case the anchor and cursor of the selections are
on the same character).

## Normal Mode

In normal mode, keys are not inserted directly inside the buffer, but are editing
commands. These commands provide ways to manipulate either the selections themselves,
or the selected text.

## Insert Mode

When entering insert mode, keys are now directly inserted before each
selection's cursor. Some additional keys are recognised in insert mode:

- [ ] `<esc>`: leave insert mode
- [ ] `<backspace>`: delete characters before cursors
- [ ] `<del>`: delete characters under cursors
- [ ] `<left> <right>, <up>, <down>`: move the cursors in given direction (TODO: fix switching in and out of SHIFT variants, hjlk version works correctly)
- [ ] `<home>`: move cursors to line begin
- [ ] `<end>`: move cursors to end of line

### These may be implemented completely differently because of Code's UI

- [ ] `<c-n>`: select next completion candidate
- [ ] `<c-p>`: select previous completion candidate
- [ ] `<c-x>`: explicit insert completion query, followed by:
  - [ ] - `f`: explicit file completion
  - [ ] - `w`: explicit word completion
  - [ ] - `l`: explicit line completion
- [ ] `<c-o>`: disable automatic completion for this insert session
- [ ] `<c-r>`: insert contents of the register given by next key
- [ ] `<c-v>`: insert next keystroke directly into the buffer,
      without interpreting it.
- [ ] `<c-u>`: commit changes up to now as a single undo group.
- [ ] `<a-;>`: escape to normal mode for a single command

## Movement

See [Appending](#Appending) below for instructions on extending (appending to) the current selection, in order to select more text in multiple steps.

- [x] `h`: select the character on the left of selection end
- [x] `j`: select the character below the selection end
- [x] `k`: select the character above the selection end
- [x] `l`: select the character on the right of selection end

- [x] `w`: select the word and following whitespaces on the right of selection end (see TODO)
- [x] `b`: select preceding whitespaces and the word on the left of selection end (see TODO)
- [x] `e`: select preceding whitespaces and the word on the right of selection end (see TODO)
- [ ] `<a-[wbe]>`: same as [wbe] but select WORD instead of word

- [x] `f`: select to (including) the next occurrence of the given character (TODO: should wrap past lines)
- [x] `t`: select until (excluding) the next occurrence of the given character
- [ ] `<a-[ft]>`: same as [ft] but in the other direction

- [ ] `m`: select to matching character
- [ ] `M`: extend selection to matching character

- [x] `x`: select line on which selection end lies (or next line when end lies on
      an end-of-line)
- [x] `X`: similar to `x`, except the current selection is extended
- [ ] `<a-x>`: expand selections to contain full lines (including end-of-lines)
- [ ] `<a-X>`: trim selections to only contain full lines (not including last
      end-of-line)

- [x] `%`: select whole buffer

- [ ] `<a-h>`: select to line begin
- [ ] `<a-l>`: select to line end

- [ ] `/`: search (select next match)
- [ ] `<a-/>`: search (select previous match)
- [ ] `?`: search (extend to next match)
- [ ] `<a-?>`: search (extend to previous match)
- [ ] `n`: select next match
- [ ] `N`: add a new selection with next match
- [ ] `<a-n>`: select previous match
- [ ] `<a-N>`: add a new selection with previous match

- [ ] `pageup, <c-b>`: scroll one page up
- [ ] `pagedown, <c-f>`: scroll one page down
- [ ] `<c-u>`: scroll half a page up
- [ ] `<c-d>`: scroll half a page down

- [ ] `)`: rotate selections (the main selection becomes the next one)
- [ ] `(`: rotate selections backwards

- [x] `;`: reduce selections to their cursor
- [ ] `<a-;>`: flip the selections' direction
- [ ] `<a-:>`: ensure selections are in forward direction (cursor after anchor)

- [ ] `<a-.>`: repeat last object or `f`/`t` selection command.

- [ ] `_`: trim selections

A word is a sequence of alphanumeric characters or underscore, a WORD is a
sequence of non whitespace characters.

## Appending

For most [Movement](#Movement) commands, using `Shift` extends the current selection
instead of replacing it.

Examples:

- [ ] `wWW` selects 3 consecutive words: first `w` selects a word, then `WW` extends the selection two words further.
- [ ] `f/F/` selects up to and including the second `/` character forward.

## Using Counts

Most selection commands also support counts, which are entered before the
command itself.

For example, `3W` selects 3 consecutive words and `3w` select the third word on
the right of selection end.

## Changes

- [ ] `i`: enter insert mode before current selection
- [ ] `a`: enter insert mode after current selection
- [ ] `d`: yank and delete current selection
- [ ] `c`: yank and delete current selection and enter insert mode
- [ ] `.`: repeat last insert mode change (`i`, `a`, or `c`, including
      the inserted text)

- [ ] `<a-d>`: delete current selection
- [ ] `<a-c>`: delete current selection and enter insert mode

- [ ] `I`: enter insert mode at current selection begin line start
- [ ] `A`: enter insert mode at current selection end line end
- [ ] `o`: enter insert mode in one (or given count) new lines below
      current selection end
- [ ] `O`: enter insert mode in one (or given count) new lines above
      current selection begin

- [ ] `<a-o>`: add an empty line below cursor
- [ ] `<a-O>`: add an empty line above cursor

- [ ] `y`: yank selections
- [ ] `p`: paste after current selection end
- [ ] `P`: paste before current selection begin
- [ ] `<a-p>`: paste all after current selection end, and
      select each pasted string.
- [ ] `<a-P>`: paste all before current selection begin, and
      select each pasted string.
- [ ] `R`: replace current selection with yanked text
- [ ] `<a-R>`: replace current selection with every yanked text

- [ ] `r`: replace each character with the next entered one

- [ ] `<a-j>`: join selected lines
- [ ] `<a-J>`: join selected lines and select spaces inserted
      in place of line breaks
- [ ] `<a-m>`: merge contiguous selections together (works across lines as well)

- [ ] `<gt> (>)`: indent selected lines
- [ ] `<a-gt>`: indent selected lines, including empty lines
- [ ] `<lt> (<)`: deindent selected lines
- [ ] `<a-lt>`: deindent selected lines, do not remove incomplete
      indent (3 leading spaces when indent is 4)

- [ ] `|`: pipe each selection through the given external filter program
      and replace the selection with it's output.
- [ ] `<a-|>`: pipe each selection through the given external filter program
      and ignore its output

- [ ] `!`: insert command output before selection
- [ ] `<a-!>`: append command output after selection

- [ ] `u`: undo last change
- [ ] `<a-u>`: move backward in history
- [ ] `U`: redo last change
- [ ] `<a-U>`: move forward in history

- [ ] `&`: align selection, align the cursor of selections by inserting
      spaces before the first character of the selection
- [ ] `<a-&>`: copy indent, copy the indentation of the main selection
      (or the count one if a count is given) to all other ones

- [ ] `\``: to lower case

- [ ] `~`: to upper case
- [ ] `` <a-`> ``: swap case

- [ ] `@`: convert tabs to spaces in current selections, uses the buffer
      tabstop option or the count parameter for tabstop.
- [ ] `<a-@>`: convert spaces to tabs in current selections, uses the buffer
      tabstop option or the count parameter for tabstop.

- [ ] `<a-)>`: rotate selections content, if specified, the count groups
      selections, so `3<a-)>` rotate (1, 2, 3) and (3, 4, 6)
      independently.
- [ ] `<a-(>`: rotate selections content backwards

## Goto Commands

Commands beginning with `g` are used to goto certain position and or buffer.
If a count is given prior to hitting `g`, `g` will jump to the given line.
Using `G` will extend the selection rather than jump.

See <<doc/pages/keys#goto-commands,`:doc keys goto-commands`>>.

## View commands

Commands beginning with `v` permit to center or scroll the current
view. Using `V` will lock view mode until `<esc>` is hit

See <<doc/pages/keys#view-commands,`:doc keys view-commands`>>.

## Marks

Current selections position can be saved in a register and restored later on.

See <<doc/pages/keys#marks,`:doc keys marks`>>.

## Jump list

Some commands, like the goto commands, buffer switch or search commands,
push the previous selections to the client's jump list.

See <<doc/pages/keys#jump-list,`:doc keys jump-list`>>.

## Multi Selection

Kak was designed from the start to handle multiple selections.
One way to get a multiselection is via the `s` key.

For example, to change all occurrences of word 'roger' to word 'marcel'
in a paragraph, here is what can be done:

- [ ] select the paragraph with enough `x`
- [ ] press `s` and enter roger, then enter
- [ ] now paragraph selection was replaced with multiselection of each roger in
      the paragraph
- [ ] press `c` and marcel<esc> to replace rogers with marcels

A multiselection can also be obtained with `S`, which splits the current
selection according to the regex entered. To split a comma separated list,
use `S` then ', \*'

The regex syntax supported by Kakoune is the based on the ECMAScript script
syntax and is described at <<doc/pages/regex#,`:doc regex`>>.

`s` and `S` share the search pattern with `/`, and hence entering an empty
pattern uses the last one.

As a convenience, `<a-s>` allows you to split the current selections on
line boundaries.

To clear multiple selections, use `space`. To keep only the nth selection
use `n` followed by `space`, in order to remove a selection, use `<a-space>`.

`<a-k>` allows you to enter a regex and keep only the selections that
contains a match for this regex. Using `<a-K>` you can keep the selections
not containing a match.

`C` copies the current selection to the next line (or lines if a count is given)
`<a-C>` does the same to previous lines.

`$` allows you to enter a shell command and pipe each selection to it.
Selections whose shell command returns 0 will be kept, other will be dropped.

## Object Selection

Objects are specific portions of text, like sentences, paragraphs, numbers…
Kakoune offers many keys allowing you to select various text objects.

See <<doc/pages/keys#object-selection,`:doc keys object-selection`>>.

# Commands

When pressing `:` in normal mode, Kakoune will open a prompt to enter a command.

Commands are used for non editing tasks, such as opening a buffer, writing the
current one, quitting, etc.

See <<doc/pages/keys#prompt-commands,`:doc keys prompt-commands`>>.

## Basic Commands

Some commands take an exclamation mark (`!`), which can be used to force
the execution of the command (i.e. to quit a modified buffer, the
command `q!` has to be used).

Commands starting with horizontal whitespace (e.g. a space) will not be
saved in the command history.

- [ ] `cd [<directory>]`: change the current directory to `<directory>`, or the home directory if unspecified
- [ ] `doc <topic>`: display documentation about a topic. The completion list
      displays the available topics.
- [ ] `e[dit][!] <filename> [<line> [<column>]]`: open buffer on file, go to given
      line and column. If file is already opened, just switch to this file.
      Use edit! to force reloading.
- [ ] `w[rite][!] [<filename>]`: write buffer to <filename> or use its name if
      filename is not given. If the file is write-protected, its
      permissions are temporarily changed to allow saving the buffer and
      restored afterwards when the write! command is used.
- [ ] `w[rite]a[ll]`: write all buffers that are associated to a file.
- [ ] `q[uit][!] [<exit status>]`: exit Kakoune, use quit! to force quitting even
      if there is some unsaved buffers remaining. If specified, the client exit
      status will be set to <exit status>.
- [ ] `w[a]q[!] [<exit status>]`: write the current buffer (or all buffers when
      `waq` is used) and quit. If specified, the client exit status will be set
      to <exit status>.
- [ ] `kill[!]`: terminate the current session, all the clients as well as the server,
      use kill! to ignore unsaved buffers
- [ ] `b[uffer] <name>`: switch to buffer <name>
- [ ] `b[uffer]n[ext]`: switch to the next buffer
- [ ] `b[uffer]p[rev]`: switch to the previous buffer
- [ ] `d[el]b[uf][!] [<name>]`: delete the buffer <name>
- [ ] `source <filename>`: execute commands in <filename>
- [ ] `colorscheme <name>`: load named colorscheme.
- [ ] `rename-client <name>`: set current client name
- [ ] `rename-buffer <name>`: set current buffer name
- [ ] `rename-session <name>`: set current session name
- [ ] `echo [options] <text>`: show <text> in status line, with the following options:
      ** `-markup`: expand the markup strings in <text>
      ** `-debug`: print the given text to the `\*debug*` buffer
- [ ] `nop`: does nothing, but as with every other commands, arguments may be
      evaluated. So nop can be used for example to execute a shell command
      while being sure that it's output will not be interpreted by kak.
      `:%sh{ echo echo tchou }` will echo tchou in Kakoune, whereas
      `:nop %sh{ echo echo tchou }` will not, but both will execute the
      shell command.
- [ ] `fail <text>`: raise an error, uses <text> as its description

## Multiple commands

Multiple commands can be separated either by new lines or by semicolons,
as such a semicolon must be escaped with `\;` to be considered as a literal
semicolon argument.
