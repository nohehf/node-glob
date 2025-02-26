/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/bin.ts TAP usage > -h shows usage 1`] = `
Object {
  "args": Array [
    "-h",
  ],
  "code": 0,
  "options": Object {},
  "signal": null,
  "stderr": "",
  "stdout": String(
    Usage:
      glob [options] [<pattern> [<pattern> ...]]
    
    Glob v10.2.7
    
    Expand the positional glob expression arguments into any matching file system
    paths found.
    
      -c<command> --cmd=<command>
                             Run the command provided, passing the glob expression
                             matches as arguments.
    
      -p<pattern> --default=<pattern>
                             If no positional arguments are provided, glob will use
                             this pattern
    
      -A --all               By default, the glob cli command will not expand any
                             arguments that are an exact match to a file on disk.
    
                             This prevents double-expanding, in case the shell
                             expands an argument whose filename is a glob
                             expression.
    
                             For example, if 'app/*.ts' would match 'app/[id].ts',
                             then on Windows powershell or cmd.exe, 'glob app/*.ts'
                             will expand to 'app/[id].ts', as expected. However, in
                             posix shells such as bash or zsh, the shell will first
                             expand 'app/*.ts' to a list of filenames. Then glob
                             will look for a file matching 'app/[id].ts' (ie,
                             'app/i.ts' or 'app/d.ts'), which is unexpected.
    
                             Setting '--all' prevents this behavior, causing glob to
                             treat ALL patterns as glob expressions to be expanded,
                             even if they are an exact match to a file on disk.
    
                             When setting this option, be sure to enquote arguments
                             so that the shell will not expand them prior to passing
                             them to the glob command process.
    
      -a --absolute          Expand to absolute paths
      -d --dot-relative      Prepend './' on relative matches
      -m --mark              Append a / on any directories matched
      -x --posix             Always resolve to posix style paths, using '/' as the
                             directory separator, even on Windows. Drive letter
                             absolute matches on Windows will be expanded to their
                             full resolved UNC maths, eg instead of 'C:\\\\foo\\\\bar', it
                             will expand to '//?/C:/foo/bar'.
    
      -f --follow            Follow symlinked directories when expanding '**'
      -R --realpath          Call 'fs.realpath' on all of the results. In the case
                             of an entry that cannot be resolved, the entry is
                             omitted. This incurs a slight performance penalty, of
                             course, because of the added system calls.
    
      -s --stat              Call 'fs.lstat' on all entries, whether required or not
                             to determine if it's a valid match.
    
      -b --match-base        Perform a basename-only match if the pattern does not
                             contain any slash characters. That is, '*.js' would be
                             treated as equivalent to '**/*.js', matching js files
                             in all directories.
    
      --dot                  Allow patterns to match files/directories that start
                             with '.', even if the pattern does not start with '.'
    
      --nobrace              Do not expand {...} patterns
      --nocase               Perform a case-insensitive match. This defaults to
                             'true' on macOS and Windows platforms, and false on all
                             others.
    
                             Note: 'nocase' should only be explicitly set when it is
                             known that the filesystem's case sensitivity differs
                             from the platform default. If set 'true' on
                             case-insensitive file systems, then the walk may return
                             more or less results than expected.
    
      --nodir                Do not match directories, only files.
    
                             Note: to *only* match directories, append a '/' at the
                             end of the pattern.
    
      --noext                Do not expand extglob patterns, such as '+(a|b)'
      --noglobstar           Do not expand '**' against multiple path portions. Ie,
                             treat it as a normal '*' instead.
    
      --windows-path-no-escape
                             Use '\\\\' as a path separator *only*, and *never* as an
                             escape character. If set, all '\\\\' characters are
                             replaced with '/' in the pattern.
    
      -D<n> --max-depth=<n>  Maximum depth to traverse from the current working
                             directory
    
      -C<cwd> --cwd=<cwd>    Current working directory to execute/match in
      -r<root> --root=<root> A string path resolved against the 'cwd', which is used
                             as the starting point for absolute patterns that start
                             with '/' (but not drive letters or UNC paths on
                             Windows).
    
                             Note that this *doesn't* necessarily limit the walk to
                             the 'root' directory, and doesn't affect the cwd
                             starting point for non-absolute patterns. A pattern
                             containing '..' will still be able to traverse out of
                             the root directory, if it is not an actual root
                             directory on the filesystem, and any non-absolute
                             patterns will still be matched in the 'cwd'.
    
                             To start absolute and non-absolute patterns in the same
                             path, you can use '--root=' to set it to the empty
                             string. However, be aware that on Windows systems, a
                             pattern like 'x:/*' or '//host/share/*' will *always*
                             start in the 'x:/' or '//host/share/' directory,
                             regardless of the --root setting.
    
      --platform=<platform>  Defaults to the value of 'process.platform' if
                             available, or 'linux' if not. Setting --platform=win32
                             on non-Windows systems may cause strange behavior!
    
      -i<ignore> --ignore=<ignore>
                             Glob patterns to ignore Can be set multiple times
      -v --debug             Output a huge amount of noisy debug information about
                             patterns as they are parsed and used to match files.
    
      -h --help              Show this usage information
    
  ),
}
`
