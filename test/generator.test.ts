import { describe, it, expect } from 'vitest';
import { generateReactContext } from '../src/generator';

describe('generateReactContext', () => {
  it('includes state and method placeholders correctly', () => {
    const fields = {
      name: 'string',
      age: 'number',
      logout: '(userId: string) => void'
    };
    const txt = generateReactContext('User', fields);

    expect(txt).toContain('interface UserState');
    expect(txt).toContain('const logout = (userId: string): void => {');
    expect(txt).toContain('const [name, setName] = useState<string>("")');
    expect(txt).toContain('useUser');
    expect(txt).toContain('setAge');
  });
});
