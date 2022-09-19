use anchor_lang::prelude::*;

declare_id!("9Yt8KUyETrZDJm3jg5pt8H2xTD49m8XPitY6cUGSjiwz");

#[program]
pub mod counter_contract {
    use super::*;

    // handler function to initialize the Counter account
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        counter_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        counter_account.count += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        counter_account.count -= 1;
        Ok(())
    }
}

// transaction instruction to initialize the Counter account
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=user, space=8+16)]
    pub counter_account: Account<'info, CounterAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter_account: Account<'info, CounterAccount>
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub counter_account: Account<'info, CounterAccount>
}

// this account is used to store the state of the counter
#[account]
pub struct CounterAccount {
    pub count: u64
}
