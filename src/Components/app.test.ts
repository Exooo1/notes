export {}

test('sortTag', () => {
    const func = (text: string) => {
        let tag = '#';
        const result = text
            .split(' ')
            .filter((item) => tag === item[0])
            .join('');
        expect(result[0]).toBe('#')
    }
    func('Hello, my name is #vlas')
})