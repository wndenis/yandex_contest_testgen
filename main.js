function getContestInfoPlus() {
    let contestName = document.querySelector(".contest-head__item_role_title").innerText;
    if (contestName)
        contestName = "# " + contestName + "\n";
    else
        contestName = "";

    let taskName = document.querySelector(".title").innerText;
    if (taskName)
        taskName = "# " + taskName + "\n";
    else
        taskName = "";

    const starter = `

def main():
    # nums = tuple(map(int, input().split()))
    ...
    
# main()

# =====================================


def main_test():
    import sys
    from io import StringIO
    global main  # noqa
    mock = []

    console_out = sys.stdout

    def mock_input(prompt=None):
        return mock.pop(0)

    def catch_print(fn):
        def decorated():
            results = StringIO()
            sys.stdout = results
            fn()
            sys.stdout = console_out
            results.seek(0)
            result = results.read()
            return result.rstrip()
        return decorated

    __builtins__.input = mock_input
    main = catch_print(main)
    test_num = 0
    def my_assert(inp, out):
        nonlocal test_num
        if inp.count("\\n") == 0:
            mock.append(inp)
        mock.extend(inp.split("\\n"))
        test_num += 1
        print(f"Test #{test_num}: ", end="")
        try:
            result = main()
            assert result == out, (result, out)
        except Exception as e:
            print("failed ❌")
            raise
        else:
            print("passed ✅")

`;

    const footer = `
    print("If you see this, all tests are passed✅")

# =====================================

if __name__ == "__main__":
    main_test()
    #main()
    
`;
    function fmt(text) {
        let lines = text.split("\n");
        let linesCount = 0;
        if (lines) linesCount = lines.length
        if (linesCount <= 1) {
            let res = `"` + text + `"`;
            return res;
        }
        else {
            let res = `"""\\\n` + text + `\\\n"""`;
            return res;
        }
    }


    let tests = Array.from(document.querySelectorAll(".sample-tests"))
        .map(x => x.querySelectorAll("td"))
        .map(x => Array.from(x).map(xi => xi.innerText.trimEnd()))
        .map(x => Array(fmt(x[0]), fmt(x[1])))
        .map(x =>
            `    inp = ${x[0]}\n` +
            `    out = ${x[1]}\n` +
            `    my_assert(inp, out)\n` +
            `    # ======================================\n`
        )
        .join("\n");
    let el = document.createElement('textarea');
    el.value = contestName + taskName + starter + tests + footer;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Шаблон и тесты скопированы в буфер");
}
getContestInfoPlus();
