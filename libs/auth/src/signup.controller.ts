import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../utils/supabase'; // assumes supabase client is exported from here
import { v4 as uuidv4 } from 'uuid';

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.from('users').insert({
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      role: 'user',
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'User created', user: data });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};